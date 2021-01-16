#!/bin/env bash

del dist/cjs

export BABEL_ENV=browserWatch
export NODE_ENV=development

babel src --out-dir dist/cjs --extensions .ts,.tsx,.js,.jsx --source-maps --watch
