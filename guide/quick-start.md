# Quick Start

Fastjs support a lot of usage, you can use it in any way you want.

## With Bundler <Badge text="Recommended" />

::: tip What is bundler?
Bundler is a tool that can bundle your code into a single file, like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/guide/en/), [Parcel](https://parceljs.org/), etc.

If your project is created by [Vue CLI](https://cli.vuejs.org/), [Vite](https://vitejs.dev/),
[Create React App](https://create-react-app.dev/), etc., you can use a bundler version.
::: 

::: tip Why a bundler version is recommended?
Bundler version is recommended because it can reduce the size of your project, and it can let fastjs to be tree-shaked by bundler.
::: 

Bundler version is recommended because it can reduce the size of your project,
and it can let fastjs to be tree-shaked by bundler.

### Create a new project

Fastjs recommend you to use `vite` to create a new project.

```bash
npm create vite@latest your-project-name --template vanilla # Clean project without any framework
npm create vite@latest your-project-name --template react # Project with React
npm create vite@latest your-project-name --template vue # Project with Vue
```

### Install Fastjs

```bash
# If you are not in your project folder(usually it is the folder you created by bundler), run this command first.
cd your-project-name
# Install Fastjs
npm i jsfast
```

### Usage

Open `src/main.js` and add this line:

```js
import { yourModules } from 'jsfast'

// ...
```

Or any file you want to use Fastjs.

Example:

```vue
<template>
  <span>{{ date }}</span>
</template>

<script setup>
  import {ref} from 'vue'
  import {date} from 'jsfast'

  const dateStr = ref(date.string())
  setInterval(() => {
    dateStr.value = date.string()
  }, 1000)
</script>
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
const { yourModules } = fastjs
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
const { yourModules } = require('jsfast')
```

## With Direct Import

Use it in browser ESM environment.

### Usage

```html
<script type="module">
  import { yourModules } from 'https://cdn.jsdelivr.net/npm/jsfast/dist/fastjs.esm.js'
  // or
  import { yourModules } from 'https://cdn.unpkg.com/jsfast/dist/fastjs.esm.js'
</script>
```