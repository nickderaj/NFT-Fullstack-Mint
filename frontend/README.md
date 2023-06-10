## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)

## Introduction

This is a very simple Minting DApp. Included are:

- Redux Tookit: To store and manage global state
- Jest: To run unit/integration tests
- Tailwind CSS: for quick development without the need of CSS classes,
- ESlint + Prettier + Husky Git Hooks: to format the code and ensure that no matter who works on the code, it will stay formatted the same way.
- Template Components (Buttons, Layouts and Modals with React Portals + Redux ) to easily replicate.

## Project Setup

- To run the app, run `yarn install` and `yarn dev`.
- To run Jest, run `yarn test`.
- The lint and formatting functions are `yarn lint` and `yarn prettier` respectively.
- The lint function will auto-run when you try to commit to a git repo, set up in the .husky folder.

Note: This app was designed to only be used with yarn to prevent a `package-lock.json` from being created which can cause conflicts - change the `engines` in `package.json` if you want to use npm instead.
