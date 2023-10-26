# Architecture of the project

## Table of Contents <!-- omit in toc -->

- [Architecture of the project](#architecture-of-the-project)
  - [Introduction](#introduction)
  - [Folder structure](#folder-structure)
  - [Pages](#pages)

## Introduction

This boilerplate uses [Next.js](https://nextjs.org/) framework for building React applications.

## Folder structure

```txt
.
├── cypress <-- Here are your E2E tests
│   ├── downloads
│   ├── e2e <-- Here are your specs
│   ├── fixtures
│   └── support
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

Next: [Testing](testing.md)