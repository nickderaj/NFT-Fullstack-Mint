## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Screenshots](#screenshots)

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

## Screenshots

| <img src="public\screenshots\1.png" width="500"> |
| :----------------------------------------------: |
|          **Figure 1.** _Connect Wallet_          |

| <img src="public\screenshots\2.png" width="500"> |
| :----------------------------------------------: |
|            **Figure 2.** _Input NRIC_            |

| <img src="public\screenshots\3.png" width="500"> |
| :----------------------------------------------: |
|         **Figure 3.** _NRIC Validation_          |

| <img src="public\screenshots\4.png" width="500"> |
| :----------------------------------------------: |
|    **Figure 4.** _Successful NRIC Validation_    |

| <img src="public\screenshots\5.png" width="500"> |
| :----------------------------------------------: |
|             **Figure 5.** _Minting_              |

| <img src="public\screenshots\6.png" width="500"> |
| :----------------------------------------------: |
|       **Figure 6.** _Waiting for response_       |

| <img src="public\screenshots\7.png" width="500"> |
| :----------------------------------------------: |
|        **Figure 7.** _Minting Successful_        |

| <img src="public\screenshots\8.png" width="500"> |
| :----------------------------------------------: |
|          **Figure 8.** _Minting Failed_          |

| <img src="public\screenshots\9.png" width="500"> |
| :----------------------------------------------: |
|           **Figure 9.** _Viewing NFTs_           |

| <img src="public\screenshots\10.png" width="500"> |
| :-----------------------------------------------: |
|           **Figure 10.** _NRIC in use_            |
