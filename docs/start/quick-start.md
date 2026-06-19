# Quick Start

Fastjs supports several ways to be loaded — pick the one that fits your project.

## With Bundler <Badge text="Recommended" />

::::simple

:::tip Am I using a bundler?
Common bundlers include `vite`, `webpack`, `rollup`, and `esbuild`-based tools.
:::

:::tip Why is the bundler build recommended?
The bundler build keeps `process.env.NODE_ENV` checks in place, so your bundler can dead-code-eliminate the development-only warnings in production. It is also fully tree-shakeable.
:::

::::

The bundler build keeps your final bundle small and lets you import only the helpers you need.

### Create a new project

:::warning Fastjs CLI is archived
The official `create-fastjs` CLI [was archived on Dec 22, 2023](./cli) and is no longer maintained. Use Vite (below) to scaffold a project and add `jsfast` manually.
:::

Fastjs works great with `vite`:

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

Open `src/main.js` and try the example:

```js
import { date } from "jsfast";

console.log(date.string()); // e.g. "2025-06-19 09:32:14"
```

A couple more one-liners to taste what's available:

```js
import { dom, request, cookie, rand, uuid } from "jsfast";

dom("body").addClass("ready").text("Hello Fastjs!");
request.get("/api/posts").then((data) => console.log(data));
cookie.set("token", "abc", { maxAge: 3600, sameSite: "Lax" });
console.log(rand(0, 9), uuid());
```

## With CDN

Drop a single `<script>` to expose the `fastjs` global.

### Usage

```html
<script src="https://cdn.jsdelivr.net/npm/jsfast/dist/fastjs.global.js"></script>
<!-- or -->
<script src="https://unpkg.com/jsfast/dist/fastjs.global.js"></script>
```

```js
console.log(fastjs.date.string());
fastjs.dom("body").text("Hello!");
```

Prefer to skip the namespace:

```js
const { date, dom, cookie } = fastjs;
```

For production, use the minified, development-stripped build:

```html
<script src="https://cdn.jsdelivr.net/npm/jsfast/dist/fastjs.global.prod.js"></script>
```

## With Node.js

::: tip Production environment
Fastjs ships separate development and production builds. The production build automatically kicks in when `NODE_ENV === "production"`. Check the variable if you do not see the speed/size you expect.
:::

Fastjs requires **Node.js ≥ 18** (for the global `fetch`, `AbortController`, and `AbortSignal.timeout`).

### Install

```bash
npm i jsfast
```

### Usage

```js
// ESM
import { date, request, uuid } from "jsfast";

// CJS
const { date, request, uuid } = require("jsfast");

console.log(date.string(), uuid());
```

> The browser-only modules (`dom`, `cookie`, `utils.copy`) degrade safely in Node — reads return `null` / `false`, writes are no-ops and a warning is logged in development mode.

## With Direct Import

Use the native ESM build directly in the browser, no bundler required.

### Usage

```html
<script type="module">
  import { date } from "https://cdn.jsdelivr.net/npm/jsfast/dist/fastjs.esm-browser.js";
  // or production:
  // import { date } from "https://cdn.jsdelivr.net/npm/jsfast/dist/fastjs.esm-browser.prod.js";

  console.log(date.string());
</script>
```
