#!/bin/env node

const { spawn } = require('child_process')
const args = process.argv.slice(2)
const port = args[1]
const component = args[3]

const path = `./src/components/${component}`

spawn('yarn', ['start-storybook', '-p', port, '-s', path], {
  stdio: 'inherit',
  shell: true
})
