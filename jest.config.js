module.exports = {
  testMatch: [
    '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)',
    '<rootDir>/tests/?(*.)+(spec|test).[jt]s?(x)'
  ],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  globals: {
    __DEV__: true,
    __VERSION__: true,
    __BUILD_DATE__: true,
    __COMMIT_SHA__: true
  },
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/globals.d.ts',
    '!<rootDir>/src/__tests__/**',
    '!<rootDir>/src/__fixtures__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
