const ignoreForTests = ['node_modules', 'src/**/*.d.ts']

const ignoreForProduction = [
  'src/**/__tests__/**/*',
  'src/**/*.spec.ts',
  'src/**/*.test.ts',
  'src/**/*.d.ts'
]

module.exports = {
  presets: ['@babel/typescript', ['@babel/preset-env']],
  plugins: [
    '@babel/proposal-class-properties', // stage-3 proposal
    'babel-plugin-dev-expression'
  ],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            // modules: false,
            targets: {
              node: 'current'
            }
          }
        ]
      ],
      ignore: ignoreForTests,
      sourceMaps: 'inline'
    },
    browser: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              browsers: ['>0.2%', 'not dead', 'not op_mini all']
            }
          }
        ]
      ],
      plugins: [
        [
          'transform-define',
          {
            'process.env.NODE_ENV': 'production'
          }
        ]
      ],
      ignore: ignoreForProduction
    },
    browserPolyfill: {
      presets: [
        [
          '@babel/env',
          {
            debug: true,
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              browsers: ['>0.2%', 'not dead', 'not op_mini all']
            }
          }
        ]
      ],
      plugins: [
        [
          'transform-define',
          {
            'process.env.NODE_ENV': 'production'
          }
        ]
      ],
      ignore: ignoreForProduction
    },
    browserModule: {
      // target node runtime
      presets: [
        [
          '@babel/env',
          {
            targets: {
              esmodules: true
            }
          }
        ]
      ],

      plugins: [
        [
          'transform-define',
          {
            'process.env.NODE_ENV': 'production'
          }
        ]
      ],
      ignore: ignoreForProduction
    },
    browserModulePolyfill: {
      presets: [
        [
          '@babel/env',
          {
            debug: true,
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              esmodules: true
            }
          }
        ]
      ],
      plugins: [
        [
          'transform-define',
          {
            'process.env.NODE_ENV': 'production'
          }
        ]
      ],
      ignore: ignoreForProduction
    },
    cjs: {
      // target node runtime
      presets: [
        [
          '@babel/env',
          {
            // debug: true,
            modules: 'cjs',
            targets: {
              node: 10 // es2018
            }
          }
        ]
      ],
      ignore: ignoreForProduction
    },
    esm: {
      // target node runtime
      presets: [
        [
          '@babel/env',
          {
            // debug: true,
            // useBuiltIns: 'usage',
            // corejs: 3,
            modules: false,
            targets: {
              node: 12 // es2018
            }
          }
        ]
      ],
      ignore: ignoreForProduction
    }
  }
}
