const { execSync } = require('child_process')

const nodeEnv = process.env.NODE_ENV || 'production'

const buildDate = execSync('git show -s --format=%ci HEAD')
  .toString()
  .replace(/[\r\n]+$/, '')

console.log(buildDate)

const commitSha = execSync('git rev-parse --short HEAD')
  .toString()
  .replace(/[\r\n]+$/, '')

console.log(commitSha)
