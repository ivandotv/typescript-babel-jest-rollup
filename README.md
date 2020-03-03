# TypeScript with BabelJS, Jest and Rollup Quick Start Template

Opinionated template repository for creating javascript libraries with typescript, rollup babeljs, and jest.

## Getting Started

You can immediately create your own repo by clicking on the `Use this template` button in the Github page UI.
Or you can use [deGit](https://github.com/Rich-Harris/degit) which is a very convenient tool to quickly download the repository `degit https://github.com/ivandotv/node-module-typescript`

### Then

1. Run `npm outdated` for minor updates, or you can run `npx npm-check-updates` to see if any packages need major upgrades.
2. Run `npm install`

## Table of Contents

- [Typescript via BabelJS](#typescript-via-babeljs)
- [Rollup configuration](#rollup)
- [Jest](#jest)
- [ESLint and Prettier](#eslint-and-prettier)
- [Continous Integration](#continous-integration)
- [Git Hooks](#git-hooks)
- [Debugging](#debugging)
- [Nodemon](#nodemon)

### Typescript via BabelJS

Typescript files are compiled via Babeljs, which makes compilation a lot faster. However, as a consequence typescript types are not type-checked. Fear not there are scripts (`type-check` and `type-check:watch`) to check and watch for typescript errors.

Babel is set to compile two versions of your source code (with no polyfills):

- `cjs` (ES5) which targets node `v10`
- `esm` (ES6) which targets browsers that support es6 modules (which results in very little transpiled code)

You can generate documentation for your source files via [typedoc](https://typedoc.org).
Currently, it is set up to go into `docs/api` directory and it is generated in markdown so it can be displayed on Github.

- Private members are excluded.
- Only exported properties are documented.

### Jest

Jest is used for testing. You can write your tests in typescript and they will be compiled via babeljs for the nodejs version that is running the tests. The testing environment is set to `node` you might want to change that if you need access to `DOM` in your tests.
I think there is no faster way to run typescript tests in jest. :)

The coverage threshold is set to `80%` globally.

Two plugins are added to jest:

- `jest-watch-typeahead` (for filtering tests by file name or test name)
- `jest-junit` for reporting coverage.

### Rollup

Rollup is used to compile code for the browser. Rollup configuration compiles:

- `umd` packages with and without polyfills
- `esm` version for modern browsers.

### ESLint and Prettier

- ESLint is set up to use [standardJS configuration](https://standardjs.com/index.html#typescript) for typescript.
- with a few overrides which I think are common sense. You can see the overrides inside the [.eslintrc.js](.eslintrc.js) file. If you don't like it, just remove the `.eslintrc.js` file.

Prettier is set up to work together with eslint and there should be no conflicts.

### Continous Integration

[CircleCI](https://circleci.com/) is used for continuous integration.

Tests are run for node versions 10, 12 and 13.

CircleCI is also set up to upload code coverage to [codecov.io](https://codecov.io) however you can also use [coveralls](https://coveralls.io) for code coverage ( it's currently commented out).

### Git Hooks

There is one git hook setup via [husky](https://www.npmjs.com/package/husky) package in combination with [lint-staged](https://www.npmjs.com/package/lint-staged). Before committing the files all staged files will be run through ESLint and Prettier.

### Debugging

If you are using VS Code as your editor,
there are two debug configurations:

- Debug the application by starting at `index.ts` file
- Debug currently focused test file inside the editor.

### Nodemon

Nodemon is set to watch `dist/cjs` directory (where ES5 compile code is saved) and it will automatically reload `index.js`
