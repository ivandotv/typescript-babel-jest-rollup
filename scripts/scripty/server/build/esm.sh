#!/bin/env bash

del dist/esm && cross-env NODE_ENV=production BABEL_ENV=esm babel src --out-dir dist/esm --extensions \".ts,.tsx,js,jsx\" --source-maps
