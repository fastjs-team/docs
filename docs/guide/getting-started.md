# Getting Started

## Create a new project

:::tip Fastjs CLI
Fastjs-cli is now available!
:::

First, you need to install the Fastjs CLI:

```bash
npm install -g fastjs-cli
```

Then, use fastjs-cli to create a new project:

```bash
fastjs create my-project
```

## Write a demo

```js
import { selecter } from 'fastjs-next'

selecter('body').html('Hello World!')
```