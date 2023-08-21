[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

### Code Coverage (Only redux store)

| Statements                                                                                           | Branches                                                                                        | Functions                                                                                        | Lines                                                                                      |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/statements-99.79%25-brightgreen.svg?style=flat&logo=jest) | ![Branches](https://img.shields.io/badge/branches-98.9%25-brightgreen.svg?style=flat&logo=jest) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat&logo=jest) | ![Lines](https://img.shields.io/badge/lines-99.76%25-brightgreen.svg?style=flat&logo=jest) |

# Razor

Razor is a type-racing app. The player can create a private lobby and invite others to play online.

This project was generated using [Nx](https://nx.dev).

There are also many [community plugins](https://nx.dev/community) you could add.

## How to commit

After staging files, run `git commit` to add commit message.
**Don't use `-m` flag as we using [Commitzen](https://github.com/commitizen/cz-cli) to make meaningful commits easily**

> You will recive step by step fields to add your commit message details.

Please follow this [guide](https://www.conventionalcommits.org/en/v1.0.0/) to learn more about conventional commits.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@razor/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you
change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use
the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
