const pkg = require('../package.json')
const { series } = require('async')
const { spawn } = require('child_process')
const { promises: fs } = require('fs')

const buildTarget = pkg.buildTarget

if (!buildTarget || buildTarget.length === 0) {
  throw new Error(`key: "buildTarget" in package.json not found or empty.
  Please add "buildTarget" key to package.json with the value of "browser" or "server".
  `)
}

// if build target browser
console.log('👷 build target: ', buildTarget)

if (buildTarget === 'server') {
  spawn('yarn', ['server:build'], {
    stdio: 'inherit',
    shell: true
  })
} else {
  // browser
  spawn('yarn', ['browser:build'], {
    stdio: 'inherit',
    shell: true
  })
}
