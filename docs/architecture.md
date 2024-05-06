# Architecture of the project

## Table of Contents <!-- omit in toc -->

- [Architecture of the project](#architecture-of-the-project)
  - [Introduction](#introduction)
  - [Folder structure](#folder-structure)
  - [Pages](#pages)

## Introduction

As far as this boilerplate uses [Next.js](https://nextjs.org/) framework for building React applications, the folders are used as routes.  This means the more folders you add to your app folder, the more routes you will get. Additionally, if you create a new folder inside of another folder, you will get nested routes. To better understand these concepts, we suggest looking at the image below.

<img src="https://github.com/brocoders/extensive-react-boilerplate/assets/72293912/25dc524e-b2e2-41cf-b1af-99f729ee9c2f" width="450"/>

## Folder structure

```txt
.
├── playwright-tests <-- Here are your E2E tests
├── public
└── src
    ├── app
    │   └── [language] <-- Here are your pages (routes)
    │       ├── admin-panel
    │       ├── confirm-email
    │       ├── forgot-password
    │       ├── password-change
    │       ├── profile
    │       ├── sign-in
    │       └── sign-up
    ├── components <-- Here are your common components (Forms, Tables, etc.)
    │   ├── confirm-dialog
    │   ├── form
    │   └── table
    └── services <-- Here are your services (Auth, API calls, I18N, etc.)
        ├── api
        ├── auth
        ├── helpers
        ├── i18n
        │   └── locales
        ├── leave-page
        ├── react-query
        └── social-auth
            ├── facebook
            └── google
```

## Pages

Pages are located in the `src/app/[language]` folder. We use `[language]` directory to support internationalization with ability generate static website (`output: export`). Example [here](https://github.com/i18next/next-13-app-dir-i18next-example).

---

Previous: [Installing and Running](installing-and-running.md)

Next: [Auth](auth.md)
