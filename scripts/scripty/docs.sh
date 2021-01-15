#!/bin/env bash

del docs/api && typedoc --theme markdown --readme none --excludePrivate --excludeNotExported --out docs/api ./src
