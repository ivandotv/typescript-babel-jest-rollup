#!/bin/env bash

del dist/esm

export NODE_ENV=production
export BABEL_ENV=esm

babel src --out-dir dist/esm --extensions .ts,.tsx,js,jsx --source-maps
