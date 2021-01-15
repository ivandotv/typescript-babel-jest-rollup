#!/bin/env bash

del dist/cjs && cross-env BABEL_ENV=browserWatch NODE_ENV=development babel src --out-dir dist/cjs --extensions \".ts,.tsx,js,jsx\" --source-maps --watch
