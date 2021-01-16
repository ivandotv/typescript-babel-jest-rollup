#!/bin/env bash

yarn type-check

jest --runInBand --ci --reporters=default --reporters=jest-junit --coverage --coverageDirectory=coverage
