# Scaling up with request

The previous page covered the bread-and-butter `request.get` / `request.post`. This page is for everything else: headers, timeouts, debouncing, cancellation, custom response handling, and the `request.config` global.

## Set request headers

Pass `headers` in the third (`config`) argument.

```typescript
request.get("https://reqres.in/api/users", null, {
  headers: {
    Authorization: "Bearer token",
  },
});
```

### Common Question

Q: I'm trying to send a `Cookie` header from JavaScript and it doesn't work.

A: `Cookie`, `Authorization` (in some browsers), `Set-Cookie`, `Host` and the rest of the [forbidden header names](https://developer.mozilla.org/docs/Glossary/Forbidden_header_name) are off-limits to scripts. The browser silently strips them. Use the [`cookie`](../cookie/) module to write a cookie that the browser will then send automatically.

## Set request timeout

`config.timeout` (in milliseconds) aborts the request via `AbortSignal.timeout`. `0` disables it.

```typescript
request.get("https://looooong.example/", null, { timeout: 10_000 });
```

:::warning Very short timeouts
In development mode, a `fastjs/request` warning is logged when `timeout` is ≤ 1000 ms – it is easy to accidentally abort every request that way.
:::

### Set default timeout

`request.config` is the **global** config object. Anything you set on it becomes the default for subsequent calls.

```typescript
request.config.timeout = 10_000;
```

## Built-in debounce

`config.wait` (milliseconds) collapses multiple calls into one – the request is only fired after `wait` has passed without another call. Calling `abort()` while waiting cancels the pending timer.

```typescript
import { dom, request } from "jsfast";

dom.newEl("button", { text: "Click me" }).addEvent("click", () => {
  request
    .get("https://reqres.in/api/users", null, { wait: 1000 })
    .then((data) => console.log(data));
});
```

## Cancelling a request

Every `FastjsRequest` exposes `abort(reason?)`. It clears any pending debounce timer **and** aborts the underlying `fetch` via its `AbortController`.

```typescript
const req = request.get("https://reqres.in/api/long");
req.then((data) => console.log(data));

// Later, e.g. when the user navigates away:
req.abort("navigated away");
```

`abort()` before the request has been dispatched (e.g. during `wait`) is a safe no-op for downstream observers.

## Customise the response handling

`request.config.handler` controls how Fastjs decides "success vs failure" and how the body is decoded.

By default Fastjs decodes the body as JSON when `Content-Type` includes `application/json`, otherwise as text, and treats any 2xx code as success.

Example: accept any 4xx as "success" so you can read the body in `.then`:

```typescript
request.config.handler.responseCode = (code) => code >= 200 && code < 500;
```

Example: always decode as `ArrayBuffer`:

```typescript
request.config.handler.handleResponse = async (response) =>
  await response.arrayBuffer();
```

:::advance

#### `GlobalConfig` Type Declaration

```typescript
interface GlobalConfig {
  timeout: number;
  hooks: RequestHookParam;
  handler: {
    handleResponse: (
      response: Response,
      request: FastjsRequest,
    ) => Promise<any>;
    responseCode: (code: number, request: FastjsRequest) => boolean;
  };
  check: {
    ignoreFormatWarning: boolean;
    stringBodyWarning: boolean;
    unrecommendedMethodWarning: boolean;
  };
}
```

The default implementation:

```typescript
handler: {
  // application/json → json(); everything else → text()
  handleResponse: async (response) => {
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  },
  // 2xx is "success"
  responseCode: (code) => code >= 200 && code < 300,
}
```

:::

## Per-call config reference

Anything you don't pass to `config` is filled in from `request.config` (the global). See [Add Hooks](./hooks) for the hook fields.

:::advance

#### `RequestConfig` Type Declaration

```typescript
interface RequestConfig {
  timeout: number;
  headers: { [key: string]: string };
  wait: number;
  failed: (error: FailedParams<Error | number>) => void;
  callback: (data: RequestReturnData, response: RequestReturn) => void;
  query: { [key: string]: any } | string | null;
  body: { [key: string]: any } | string | null;
  hooks: RequestHookParam;
}
```

:::

## Reusing config

Use `request.request(config)` to materialise a `RequestConfig` (with global defaults merged in) and pass it around explicitly:

```typescript
const baseCfg = request.request({
  timeout: 8000,
  headers: { "X-App": "demo" },
});

request.get("/api/posts", null, baseCfg);
request.post("/api/posts", { title: "Hi" }, baseCfg);
```

If you want a fully-fledged reusable instance with its own URL / data / hooks, use [`request.create`](./instance.md) instead.
