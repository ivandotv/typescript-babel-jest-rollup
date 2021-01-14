const pkg = require('../package.json')
console.log('pkg version ', pkg.version)
const { series } = require('async')
const path = require('path')
const { spawn } = require('child_process')

const del = require('del')

;(async () => {
  const deletedDirectoryPaths = await del(['dist/cjs'])
  console.log('Deleted directories:\n', deletedDirectoryPaths.join('\n'))
})()

series([
  (cb) => {
    process.env.NODE_ENV = 'production'
    process.env.BABEL_ENV = 'cjs'
    console.log('set "PROD')
    console.log('----- path:: ', path.resolve('../'))
    cb()
  },
  function (callback) {
    // "build:cjs": "cross-env BABEL_ENV=cjs NODE_ENV=production babel src --out-dir dist/cjs --extensions \".ts,.tsx,js,jsx\" --source-maps --verbose --out-file-extension .production.js",
    spawn(
      'npx',
      [
        'babel-cli',
        'src --out-dir dist/cjs --extensions ".ts,.tsx,js,jsx" --source-maps --verbose --out-file-extension .production.js'
      ],
      { stdio: 'inherit', shell: true }
    ).on('exit', (code) => {
      console.log(`child process exited with code ${code}`)
      callback(code)
    })
  },
  (cb) => {
    process.env.NODE_ENV = 'development'
    console.log('set "DEV"')
    cb()
  },
  function (callback) {
    const ls = spawn('npm', ['run', 'build:cjsd'], { stdio: 'inherit' })
    ls.on('exit', (code) => {
      console.log(`>>>>>> child process exited with code ${code}`)
      callback()
    })
  }
])
/*
    Development build for the brower

*/
// build dev version - pure babel

// build production version - rollup

// dodati specijalan index.js
