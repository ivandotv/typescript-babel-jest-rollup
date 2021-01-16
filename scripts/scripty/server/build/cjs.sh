#!/bin/env bash

del dist/cjs

export BABEL_ENV=cjs
export NODE_ENV=production

babel src --out-dir dist/cjs --extensions .ts,.tsx,.js,.jsx --source-maps
