# Quick Start

Fastjs support a lot of usage, you can use it in any way you want.

## With Bundler <Badge text="Recommended" />

::: tip What is bundler?
Bundler is a tool that can bundle your code into a single file, like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/guide/en/), [Parcel](https://parceljs.org/), etc.

If your project is created by [Vue CLI](https://cli.vuejs.org/), [Vite](https://vitejs.dev/), [Create React App](https://create-react-app.dev/), etc, you can use bundler version.
::: 

::: tip Why bundler version is recommended?
Bundler version is recommended because it can reduce the size of your project, and it can let fastjs to be tree-shaked by bundler.
::: 

We recommend you to use this version, it is super easy to use.

### Install



```bash
npm i @fastjs-next/core
```

### Usage

```js
import { yourModules } from '@fastjs-next/core'
```

## With CDN

Use it in browser directly or any other way you want.

### Usage

```html
<script src="https://cdn.jsdelivr.net/npm/@fastjs-next/core/dist/fastjs.global.js"></script>
<!-- or -->
<script src="https://cdn.unpkg.com/@fastjs-next/core/dist/fastjs.global.js"></script>
```

```js
const { yourModules } = window.fastjs
```

## With Node.js

::: tip Production environment
Fastjs should run in production mode in a right time, if it is not, check is `NODE_ENV` set to `production`.
::: 

Use it in Node.js(CJS) environment.

### Install

```bash
npm i @fastjs-next/core
```

### Usage

```js
const { yourModules } = require('@fastjs-next/core')
```

## With Browser ESM

Use it in browser ESM environment.

### Usage

```html
<script type="module">
  import { yourModules } from 'https://cdn.jsdelivr.net/npm/@fastjs-next/core/dist/fastjs.esm.js'
  // or
  import { yourModules } from 'https://cdn.unpkg.com/@fastjs-next/core/dist/fastjs.esm.js'
</script>
```