const pkg = require('./package.json')

const pkgVersion = process.env.PKG_VERSION || pkg.version
const nodeEnv = process.env.NODE_ENV || 'production'

const ignoreForTests = ['node_modules', 'src/**/*.d.ts']
const ignoreForProduction = [
  'src/**/__tests__/**/*',
  'src/**/*.spec.ts',
  'src/**/*.test.ts',
  'src/**/*.d.ts'
]

//browser only replacements
const browserReplacements = {
  // 'process.env.NODE_ENV': 'production',
  'process.env.NODE_ENV': nodeEnv,
  __VERSION__: pkgVersion
}
console.log('========')

console.log(process.env.NODE_ENV)

module.exports = {
  presets: ['@babel/typescript', ['@babel/preset-env']],
  plugins: [
    ['@babel/plugin-proposal-nullish-coalescing-operator'], //node v10
    ['@babel/plugin-proposal-optional-chaining'], // node v10
    ['@babel/proposal-class-properties', { loose: true }], // stage-3 proposal
    'dev-expression',
    [
      'transform-define',
      {
        __VERSION__: pkgVersion
      }
    ]
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ],
      ignore: ignoreForTests,
      sourceMaps: 'inline'
    },
    browserWatch: {
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              browsers: [
                'last 1 chrome version',
                'last 1 firefox version',
                'last 1 safari version'
              ]
            }
          }
        ]
      ],
      plugins: [['transform-define', browserReplacements]],
      ignore: ignoreForProduction
    },
    browser: {
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              browsers: ['>0.2%', 'not dead', 'not op_mini all']
            }
          }
        ]
      ],
      plugins: [['transform-define', browserReplacements]],
      ignore: ignoreForProduction
    },
    browserDev: {
      presets: [
        [
          '@babel/env',
          {
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              browsers: ['>0.2%', 'not dead', 'not op_mini all']
            }
          }
        ]
      ],
      ignore: ignoreForProduction,
      plugins: [['transform-define', browserReplacements]]
    },
    browserPolyfill: {
      presets: [
        [
          '@babel/env',
          {
            // debug: true,
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              browsers: ['>0.2%', 'not dead', 'not op_mini all']
            }
          }
        ]
      ],
      plugins: [['transform-define', browserReplacements]],
      ignore: ignoreForProduction
    },
    browserModule: {
      // target node runtime
      presets: [
        [
          '@babel/env',
          {
            targets: {
              esmodules: true
            }
          }
        ]
      ],

      plugins: [['transform-define', browserReplacements]],
      ignore: ignoreForProduction
    },
    browserModulePolyfill: {
      presets: [
        [
          '@babel/env',
          {
            // debug: true,
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              esmodules: true
            }
          }
        ]
      ],
      plugins: [['transform-define', browserReplacements]],
      ignore: ignoreForProduction
    },
    cjs: {
      // commonjs for node
      presets: [
        [
          '@babel/env',
          {
            // debug: true,
            modules: 'cjs',
            targets: {
              node: 10 // es2018
            }
          }
        ]
      ],
      plugins: [['transform-define', browserReplacements]],
      ignore: ignoreForProduction
    },
    esm: {
      // esm for node (also "module" field in package.json)
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            targets: {
              node: 12 // es2018
            }
          }
        ]
      ],
      plugins: [
        'minify-dead-code-elimination',
        ['transform-define', browserReplacements]
      ],
      ignore: ignoreForProduction
    }
  }
}
