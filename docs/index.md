# Introduction

## What is Fastjs?

Fastjs (npm: [`jsfast`](https://www.npmjs.com/package/jsfast)) is a tiny, zero-dependency JavaScript toolkit. It bundles a small set of utilities that show up in almost every front-end project — DOM manipulation, HTTP requests, date formatting, cookies, and a few general-purpose helpers — behind a single, consistent, type-safe API.

It works the same way in browsers and in Node.js (≥ 18), and is friendly to bundlers (tree-shakeable, no global side-effects, separate dev / prod builds).

## Why Fastjs?

Most modern projects end up gluing together a handful of small libraries: one for AJAX, one for dates, one for selectors, one for clipboard… Each has its own conventions, types, and quirks.

Fastjs replaces the **most common 10–20%** of those libraries with one consistent surface:

- **One package, one mental model.** Every Fastjs instance (DOM element, date, request, cookie) is produced by the same internal factory, so they all share helpers like `setCustomProp`, `setCustomEvent`, `then`, and they all chain.
- **Type-first.** Public APIs ship full TypeScript types. Generics let you keep the underlying `HTMLInputElement`, the response shape of an HTTP call, etc.
- **Modular.** Import only what you need – `import { dom, rand } from "jsfast"` will tree-shake everything else away.
- **Honest about environments.** Browser-only modules (`dom`, `cookie`, `copy`) degrade safely outside a browser instead of throwing on import.

## Why not other libraries?

We considered the needs of users from many angles. Some of the recurring pain points other libraries cause:

### Installation

Adding several small libraries each with their own deps adds up. Fastjs is one package that covers the basics.

### API design

Tools that share concepts (e.g. selectors and Ajax) often expose them very differently. Fastjs uses one chainable, return-`this` pattern everywhere.

### TypeScript support

We provide complete TypeScript declarations bundled with the package – you won't need `@types/...` packages.

### Environment support

Fastjs is built to run anywhere modern: bundlers, browsers (IIFE / native ESM), Node.js (CJS / ESM). Where features need a browser API, the function degrades gracefully instead of throwing.

## Module overview

| Module                                           | Description                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| [`dom`](./guide/dom/)                            | Select / build / manipulate DOM elements. `FastjsDom`, `FastjsDomList`.               |
| [`date`](./guide/date/)                          | Parse / format dates, `FastjsDate` instance with timezone and "active time" support.  |
| [`request`](./guide/request/)                    | Lightweight `fetch` wrapper with hooks, path params, debounce, cancellation.          |
| [`cookie`](./guide/cookie/)                      | Safe browser cookie read / write with `SameSite`, `Max-Age`, scoped instances.        |
| [`utils`](./guide/utils/)                        | Random number / string / UUID, clipboard `copy`, polling, error helpers, type guards. |
| [`FastjsModuleBase`](./guide/common/module-base) | Methods every Fastjs instance inherits.                                               |

## Goals

We build Fastjs because the JavaScript ecosystem is over-served by very similar small libraries — each with its own way of naming things, its own dependency tree, and its own quirks.

Our goal is to provide a single, **uniform** library that:

- Works the same way in Node.js and the browser.
- Has a smaller learning curve than learning four separate libraries.
- Lets you reach for "the standard thing" without re-evaluating dependencies every time.

## Contributors

Thanks to these wonderful people for helping make Fastjs better 🙌

<a href="https://github.com/fastjs-team/core/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fastjs-team/core" />
</a>

## Sponsors

<div align="center">
  <img src="https://raw.githubusercontent.com/xiaodong2008/sponsors/main/sponsors.svg" />
</div>
