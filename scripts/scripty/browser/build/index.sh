#!/bin/env bash

set -eu

export NODE_ENV=production

node scripts/scripty/browser/build/cjs.js


yarn browser:build:unpkg
