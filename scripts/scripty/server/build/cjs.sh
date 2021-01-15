#!/bin/env bash

del dist/cjs && cross-env BABEL_ENV=cjs NODE_ENV=production babel src --out-dir dist/cjs --extensions \".ts,.tsx,js,jsx\" --source-maps
