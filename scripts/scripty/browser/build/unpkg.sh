#!/bin/env bash

del dist/unpkg && rollup -c --environment BUILD:unpkg
