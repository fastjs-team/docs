# Getting Started

## Create a new project

### Npm

Create and into a new directory.

```bash
mkdir fastjs-demo && cd fastjs-demo
```

Then, init a new project.

```bash
npm init
```

### Vite

```bash
npm init vite@latest
```

## Install Fastjs

```bash
npm install fastjs-next
```

## Write a demo

```js
import { selecter } from 'fastjs-next'

selecter('body').html('Hello World!')
```