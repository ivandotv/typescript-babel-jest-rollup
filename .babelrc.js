const ignoreForTests = ['node_modules/**']

const ignoreForProduction = [
  'node_modules/**',
  'src/**/__tests__/**/*',
  'src/**/*.spec.ts',
  'src/**/*.test.ts'
]

module.exports = {
  presets: ['@babel/typescript', ['@babel/preset-env']],
  plugins: [
    '@babel/proposal-class-properties' // stage-3 proposal
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              node: 'current'
            }
          }
        ]
      ],
      ignore: ignoreForTests,
      sourceMaps: 'inline'
    },
    cjs: {
      //target node runtime
      presets: [
        [
          '@babel/env',
          {
            // debug: true,
            targets: {
              node: 10
            }
          }
        ]
      ],
      ignore: ignoreForProduction
    },
    esm: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            // debug: true,
            targets: {
              esmodules: true
            }
          }
        ]
      ],
      ignore: ignoreForProduction
    }
  }
}
