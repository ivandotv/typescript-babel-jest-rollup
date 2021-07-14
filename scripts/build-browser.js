/* eslint-disable @typescript-eslint/no-var-requires */
const { series } = require('async')
const path = require('path')
const { spawn } = require('child_process')
const { promises: fs } = require('fs')
const del = require('del')

const argv = require('minimist')(process.argv.slice(2))

const packageRelativePath = path.relative(__dirname, process.cwd())
const pkg = require(`${packageRelativePath}/package.json`)

const withNamespace = pkg.name.split('/')[1]
const name = withNamespace ? withNamespace : pkg.name

process.env.BUILD_PACKAGE_NAME = name

const allBuilds = ['cjs', 'esm', 'umd']

const buildBundle = argv.bundle ? argv.bundle.split(',') : allBuilds

process.env.BUILD_TARGET = buildBundle.join(',')
;(async () => {
  for (const build of buildBundle) {
    const deletedDirectoryPaths = await del([`dist/${build}`])
    if (deletedDirectoryPaths.length) {
      console.log('Deleted directory:\n', deletedDirectoryPaths.join('\n'))
    }
  }
})()

let tasks = [
  (cb) => {
    spawn(
      'yarn',
      [
        '--cwd',
        process.cwd(),
        'rollup',
        '-c',
        `${path.resolve(`${__dirname}/..`)}/rollup.config.js`
      ],

      {
        stdio: 'inherit',
        shell: true
      }
    ).on('exit', (code) => {
      cb(code)
    })
  }
]

if (buildBundle.indexOf('cjs') !== -1) {
  tasks = tasks.concat(async () => {
    return await createCjsIndexFile(pkg.name)
  })
}
series(tasks)

async function createCjsIndexFile(libName) {
  const file = await fs.readFile(
    path.resolve(__dirname, './cjs-browser-template.js'),
    {
      encoding: 'utf-8'
    }
  )

  const replaced = file.replace(/__LIBRARY_NAME__/gm, libName)

  return await fs.writeFile('./dist/cjs/index.js', replaced)
}
