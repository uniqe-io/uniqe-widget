# uniqe-widget ![npm publish](https://github.com/uniqe-io/uniqe-widget/actions/workflows/npm-publish.yml/badge.svg) [![npm version](https://badge.fury.io/js/uniqe-widget.svg)](https://badge.fury.io/js/uniqe-widget)

This is a web-component that allows you to display Uniqe NFT Proof for a web3 user on your website.

![](./images/screenshot.png)

## Usage

```html
<html>
  <head>
    <!-- Include the minified js file, replace the <VERSION> tag with the current one -->
    <script src="https://unpkg.com/uniqe-widget@<VERSION>/dist/main.js"></script>
  </head>
  <body>
    <!-- Just include the wallet address of the user and you're set ! -->
    <uniqe-widget address="0x..."></uniqe-widget>
  </body>
</html>
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

## Project Setup

```sh
cp .env.example .env
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npx vite build --mode production
```
