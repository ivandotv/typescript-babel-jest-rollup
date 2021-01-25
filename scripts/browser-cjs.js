const pkg = require('../package.json')
const { series } = require('async')
const { spawn } = require('child_process')
const { promises: fs } = require('fs')

const del = require('del')

;(async () => {
  const deletedDirectoryPaths = await del(['dist/cjs'])
  console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'))
})()

series([
  function (cb) {
    // build browser cjs development and production versions
    process.env.NODE_ENV = 'development'
    process.env.BUILD = 'cjsBrowserDev,cjsBrowserProd'
    spawn('npx', ['rollup', '-c'], { stdio: 'inherit', shell: true }).on(
      'exit',
      (code) => {
        cb(code)
      }
    )
  },
  async (cb) => {
    return await createIndexFile(pkg.name)
  }
])

async function createIndexFile(libName) {
  const file = await fs.readFile('./scripts/cjs-browser-template.js', {
    encoding: 'utf-8'
  })

  const replaced = file.replace(/__LIBRARY_NAME__/gm, libName)

  return await fs.writeFile('./dist/cjs/index.js', replaced)
}
