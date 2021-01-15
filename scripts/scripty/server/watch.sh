#!/bin/env bash

del dist/cjs && BABEL_ENV=cjs NODE_ENV=development babel src --out-dir dist/cjs --extensions \".ts,.tsx,js,jsx\" --source-maps --watch
