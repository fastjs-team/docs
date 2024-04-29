# Quick Start

Fastjs support a lot of usage, you can use it in any way you want.

## With Bundler <Badge text="Recommended" />

::::simple

:::tip Is I using bundler?
Common bundlers include `webpack`, `vite`, `rollup`.
:::

:::tip Why a bundler version is recommended?
Bundler version is recommended because it can reduce the size of your project, and it can let fastjs to be tree-shaked by bundler.
:::

::::

Bundler version is recommended because it can reduce the size of your project,
and it can let fastjs to be tree-shaked by bundler.

### Create a new project

:::tip Fastjs CLI is now available!
We just released a new CLI tool for Fastjs, [Click here](./cli) to build a new project with Fastjs really fast!
:::

Fastjs recommend you to use `vite` to create a new project.

:::code-group

```bash [npm]
npm create vite@latest fastjs-project
```

```bash [yarn]
yarn create vite@latest fastjs-project
```

```bash [pnpm]
pnpm create vite@latest fastjs-project
```

```bash [bun]
bun create vite@latest fastjs-project
```

:::

### Install Fastjs

:::code-group

```bash [npm]
cd fastjs-project
npm i jsfast
```

```bash [yarn]
cd fastjs-project
yarn add jsfast
```

```bash [pnpm]
cd fastjs-project
pnpm add jsfast
```

```bash [bun]
cd fastjs-project
bun add jsfast
```

:::

### Usage

Open `src/main.js` and try this example:

```js
import { date } from "jsfast";

console.log(date.string());
```

## With CDN

Use it in browser directly or any other way you want.

### Usage

```html
<script src="https://cdn.jsdelivr.net/npm/jsfast/dist/fastjs.global.js"></script>
<!-- or -->
<script src="https://cdn.unpkg.com/jsfast/dist/fastjs.global.js"></script>
```

```js
console.log(fastjs.date.string());
```

or exclude `fastjs` namespace:

```js
const { date } = fastjs;
```

## With Node.js

::: tip Production environment
Fastjs should run in production mode in a right time, if it is not, check is `NODE_ENV` set to `production`.
:::

Use it in Node.js(CJS) environment.

### Install

```bash
npm i jsfast
```

### Usage

```js
const { date } = require("jsfast");
```

## With Direct Import

Use it in browser ESM environment.

### Usage

```html
<script type="module">
  import { date } from "https://cdn.jsdelivr.net/npm/jsfast/dist/fastjs.esm.js";
  // or
  import { date } from "https://cdn.unpkg.com/jsfast/dist/fastjs.esm.js";
</script>
```
