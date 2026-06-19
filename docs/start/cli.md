# Fastjs CLI <Badge type="warning" text="Archived" />

:::danger This project is archived
The [`fastjs-team/cli`](https://github.com/fastjs-team/cli) repository was **archived by the owner on Dec 22, 2023** and is now read-only. It no longer receives updates or bug fixes and may not work with current versions of `jsfast`.

**Recommended replacement:** scaffold a new project with [Vite](https://vitejs.dev/) and add `jsfast` to it. See [Setup Project](./quick-start) for the step-by-step.

```bash
npm create vite@latest my-project
cd my-project
npm i jsfast
```

The content below is preserved for users of legacy `create-fastjs` projects.
:::

Fastjs CLI was an official CLI tool by the Fastjs Team to scaffold a new project with Fastjs in a few seconds.

## Basic Usage

:::code-group

```bash [pnpm]
pnpm create fastjs
```

```bash [yarn]
yarn create fastjs
```

```bash [npm]
npm create fastjs
```

```bash [bun]
bun create fastjs
```

:::

## Parameters

| name        | description                    | usage            |
| ----------- | ------------------------------ | ---------------- |
| `[name]`    | The name of the project        | `fastjs-project` |
| `-p --path` | The path to create the project | `./`             |
