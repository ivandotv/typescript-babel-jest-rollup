#!/bin/env node

const pkg = require('../../../../package.json')

const { series } = require('async')
const { spawn } = require('child_process')
const { promises: fs } = require('fs')

const del = require('del')

series([
  (cb) => {
    cb()
  },
  function (cb) {
    // build browser cjs dev version
    spawn('node', ['cjs.js'], { stdio: 'inherit', shell: true }).on(
      'exit',
      (code) => {
        cb(code)
      }
    )
  },
  (cb) => {
    // build browser unpkg version version
    process.env.NODE_ENV = 'production'
    process.env.BUILD = 'cjsBrowserProd'
    spawn('yarn', ['browser:build:unpkg'], {
      stdio: 'inherit',
      shell: true
    }).on('exit', (code) => {
      cb(code)
    })
  }
])
