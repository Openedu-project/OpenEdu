# Openedu Platform

This is an official openedu repo for the Frontend team.

### Recommended system

- Nodejs: >= 20 [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)
  - Recommend: use [Fast node manager](https://github.com/Schniz/fnm)
- Pnpm: latest version [https://pnpm.io/installation](https://pnpm.io/installation)
  - update latest version: `npm install -g pnpm`.
- Editor: `vscode`, `cursor`.
- Change localhost to localhost from /etc/hosts file

```js
// window: C:\Windows\System32\drivers\etc\hosts
// mac & Linux: /etc/hosts
127.0.0.1 localhost
127.0.0.1 vbi.localhost
127.0.0.1 not-org.localhost
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Structure - monorepo

```sh
|- openedu
  |- apps
    |- admin
    |- learner
    |- blog
    |- affiliate
    |- platform
  |- packages
    |- api
    |- config
    |- builder
    |- assets
    |- core
    |- i18n
    |- config
    |- types
    |- ui
    ...
  package.json
  .env.development # variables for development environment
  .env.staging # variables for staging environment
  .env.production # variables for production environment
  ...
```

### Scripts

> Workspace is always root repo.

- Installation

```sh
pnpm install
```

- Add packages

```sh
pnpm add {npm_package} --filter {sysadmin,platform}
```

- Run dev

```sh
pnpm dev
pnpm dev --filter {sysadmin,platform}
```

- Run build

```sh
pnpm build
pnpm build --filter {sysadmin,platform}
```

- Run type check for typescript

```sh
pnpm typecheck
pnpm typecheck --filter {sysadmin,platform}
```

- Run lint

```sh
pnpm lint
pnpm lint:fix
```


- Run scripts for `shadcn UI` components for `@oe/ui` package

```sh
pnpm ui:add
pnpm ui:diff
```

- Run clean for remove `node_modules`, `dist`, `.next`.

```sh
pnpm clean
```

- Run analyzer

```sh
pnpm analyzer
pnpm analyzer --filter {sysadmin,platform}
```
