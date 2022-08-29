# uniqe-widget ![npm publish](https://github.com/uniqe-io/uniqe-widget/actions/workflows/npm-publish.yml/badge.svg) [![npm version](https://badge.fury.io/js/uniqe-widget.svg)](https://badge.fury.io/js/uniqe-widget)

This is a web-component that allows you to display Uniqe NFT Proof for a web3 user on your website.

![](./images/screenshot.png)

## Usage

```html
<html>
  <head>
    <!-- Include the minified js file, replace the <VERSION> tag with the current one -->
    <script src="https://unpkg.com/browse/uniqe-widget@<VERIONS>/dist/main.js"></script>
  </head>
  <body>
    <!-- Just include the wallet address of the user and you're set ! -->
    <uniqe-widget address="0x..."></uniqe-widget>
  </body>
</html>
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

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
