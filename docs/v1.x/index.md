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

### Vue-cli

```bash
vue create fastjs-demo
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

### Custom name

Don't like `selecter`? Change it!

```js
import { selecter as $ } from 'fastjs-next'

$('body').html('Hello World!')
```