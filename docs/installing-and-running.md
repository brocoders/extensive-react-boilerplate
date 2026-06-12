# Installation

---

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
  - [Development](#development)
  - [Production build](#production-build)

---

## Development

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/brocoders/extensive-react-boilerplate.git my-app
   ```

1. Install dependencies

   ```bash
   cd my-app
   npm install
   ```

1. Run app configuration

   > You should run this command only the first time on initialization of your project, all next time skip it.

   > If you want to contribute to the boilerplate, you should NOT run this command. It removes the boilerplate's internal generator tests (the resource and field generators themselves are kept).

   ```bash
   npm run app:config
   ```

1. Copy example environment file

   ```bash
   cp example.env.local .env.local
   ```

1. Run development server

   ```bash
   npm run dev
   ```

## Production build

1. Clone repository

   ```bash
   git clone --depth 1 https://github.com/brocoders/extensive-react-boilerplate.git my-app
   ```

1. Install dependencies

   ```bash
   cd my-app
   npm install
   ```

1. Run app configuration

   > You should run this command only the first time on initialization of your project, all next time skip it.

   > If you want to contribute to the boilerplate, you should NOT run this command. It removes the boilerplate's internal generator tests (the resource and field generators themselves are kept).

   ```bash
   npm run app:config
   ```

1. Copy example environment file

   ```bash
   cp example.env.local .env.local
   ```

1. Build application

   ```bash
   npm run build
   ```

1. Run production server

   ```bash
    npm run start
    ```

---

Previous: [Introduction](introduction.md)

Next: [Architecture](architecture.md)
