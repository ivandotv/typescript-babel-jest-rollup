import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
// import visualizer from 'rollup-plugin-visualizer'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const UMDLibraryName = 'MyLib'

const input = 'src/index.ts'

const unpkgFilePath = libPath('./dist/unpkg', 'mylib')

const babelPlugins = ['@babel/proposal-class-properties'] // stage-3 proposal

// https://github.com/rollup/rollup/issues/703#issuecomment-314848245
function defaultPlugins(config = {}) {
  return [
    babel(config.babel || undefined),
    resolve({ extensions }),
    commonjs(),
    filesize()
    // visualizer({ template: "circlepacking" }),
  ]
}

// setup config

const umdBuild = {
  input,
  output: [
    {
      file: unpkgFilePath('.js'),
      format: 'umd',
      name: UMDLibraryName,
      sourcemap: true
    },
    {
      file: unpkgFilePath('.min.js'),
      format: 'umd',
      name: UMDLibraryName,
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: unpkgFilePath('.polyfill.min.js'),
      format: 'umd',
      name: UMDLibraryName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: defaultPlugins({
    babel: {
      extensions,
      exclude: 'node_modules/**',
      configFile: false,
      presets: babelPresets({
        // debug: true,
        // "useBuiltIns": "usage",
        // "corejs": 3,
        modules: false,
        targets: {
          browsers: ['>0.2%', 'not dead', 'not op_mini all']
        }
      }),
      plugins: babelPlugins
    }
  }),
  external: []
}
const umdWithPolyFill = {
  input,
  output: [
    {
      file: unpkgFilePath('.polyfill.min.js'),
      format: 'umd',
      name: UMDLibraryName,
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: defaultPlugins({
    babel: {
      extensions,
      exclude: 'node_modules/**',
      configFile: false,
      presets: babelPresets({
        // debug: true,
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
        targets: {
          browsers: ['>0.2%', 'not dead', 'not op_mini all']
        }
      }),
      plugins: babelPlugins
    }
  }),
  external: []
}

const browserModulesBuild = {
  input,
  output: [
    {
      file: unpkgFilePath('.module.js'),
      format: 'esm',
      sourcemap: true
    },
    {
      file: unpkgFilePath('.module.min.js'),
      format: 'esm',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: defaultPlugins({
    babel: {
      extensions,
      exclude: 'node_modules/**',
      configFile: false,
      plugins: babelPlugins,
      presets: babelPresets({
        // debug: true,
        // "useBuiltIns": "usage",
        // "corejs": 3,
        modules: false,
        targets: {
          esmodules: true
        }
      })
    }
  }),
  external: []
}

function libPath(unpkgPath, name) {
  return function(suffix) {
    return unpkgPath.concat('/', name, suffix)
  }
}

function babelPresets(env) {
  return ['@babel/typescript', ['@babel/preset-env', env]]
}

export default [umdBuild, browserModulesBuild, umdWithPolyFill]
