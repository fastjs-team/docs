# Request Hooks

Hooks are the request-level lifecycle: small functions that can read or mutate the request / response, and can interrupt the pipeline by returning `false`.

## Lifecycle

There are 4 hooks: `before`, `init`, `success`, `failed`. They run in this order:

### Handle Request

- `before` – the instance exists, but the underlying `Request` object hasn't been built yet. This is the right place to tweak `request.config` (headers, query, body, …).
- `init` – the `Request` object exists and is about to be passed to `fetch`. Tweaks to `request.config` here are too late, but you can still abort by returning `false`.

### Handle Response

- `success` – the response has been parsed and matches `globalConfig.handler.responseCode` (default: 2xx).
- `failed` – either the response failed (HTTP error / non-2xx), or the underlying fetch threw.

Hooks may return a `Promise<boolean | undefined>`; `await`ed by Fastjs.

## Hook signatures

### BeforeSend (`before`, `init`)

`RequestHooks.BeforeSend` receives its own request instance and returns `boolean | undefined` (or a `Promise` of that). Return `false` to abort.

### RequestSuccess (`success`)

`RequestHooks.RequestSuccess` receives the full `RequestReturn`. Return `false` to convert success into failure (the `.catch` handlers will fire).

### RequestFailed (`failed`)

`RequestHooks.RequestFailed` receives the error or HTTP status code, plus the request instance. `error` is **either** an `Error` (network error or interception) **or** a `number` (HTTP status code when the response code wasn't accepted).

:::advance

#### Hook Type Declarations

```typescript
namespace RequestHooks {
  type BeforeSend = (request: FastjsRequest) =>
    boolean | undefined | Promise<boolean | undefined>;
  type RequestSuccess = (response: RequestReturn) =>
    boolean | undefined | Promise<boolean | undefined>;
  type RequestFailed = (error: Error | number, request: FastjsRequest) =>
    boolean | undefined | Promise<boolean | undefined>;
}
```

:::

:::advance

#### `RequestHookParam` Type Declaration

```typescript
interface RequestHookParam {
  before?: RequestHooks.BeforeSend[] | RequestHooks.BeforeSend;
  init?: RequestHooks.BeforeSend[] | RequestHooks.BeforeSend;
  success?: RequestHooks.RequestSuccess[] | RequestHooks.RequestSuccess;
  failed?: RequestHooks.RequestFailed[] | RequestHooks.RequestFailed;
  /** Keep running the remaining hooks even after one returns false. */
  runAll?: boolean;
}
```

:::

## Returning `false`

Any hook may return `false` to interrupt the request. The next callback in the failure chain will receive a [`FailedParams`](./#failedparams) with:

- `intercept: true`
- `hook: "<hook name>"`
- `error: new Error("Request interrupted by <hook>")`

```typescript
request.config.hooks.before = (req) => {
  if (!isLoggedIn()) return false; // stops the request, triggers .catch
};
```

## Set hooks

Hooks can be set at global or per-instance level.

### Global hooks

Global hooks affect every request that goes through `request.*`.

```typescript
request.config.hooks.before = (request) => {
  request.config.headers.Authorization = `Bearer ${getToken()}`;
};
```

### Instance hooks

Instance hooks are scoped to one [request instance](./instance):

```typescript
let loading = false;

const getUser = request
  .create("https://reqres.in/api/users", null, {
    hooks: {
      before: () => {
        if (loading) return false;
        loading = true;
      },
    },
  })
  .finally(() => {
    loading = false;
  });
```

## Multi hooks <Badge text="v1.0.0-alpha.15" />

:::warning Order
When both instance hooks and global hooks are set, the **instance** hooks run first; if they don't abort, the **global** hooks run next.
:::

Pass an array to register multiple hooks of the same type. By default the chain stops at the first hook that returns `false`:

```typescript
request.config.hooks.before = [
  () => {
    console.log("First");
    return false;
  },
  () => {
    console.log("Second"); // NOT called
  },
];
request.get("https://reqres.in/api/users");
// Log: First
```

Set `hooks.runAll = true` if you want every hook to execute even after one returns `false`:

```typescript
request.config.hooks.runAll = true;
request.config.hooks.before = [
  () => {
    console.log("First");
    return false;
  },
  () => {
    console.log("Second"); // also called
    return false;
  },
];
request.get("https://reqres.in/api/users");
// Log: First
// Log: Second
```

Array hooks also work in per-call config:

```typescript
request.get("https://reqres.in/api/users", null, {
  hooks: {
    before: [() => {}, () => {}],
  },
});
```

## Examples

### Inject a custom referer header

```typescript
request.config.hooks.before = (request) => {
  request.config.headers["x-refer"] = location.href;
};
```

### Tap into successful responses

```typescript
request.config.hooks.success = [
  () => console.log("Request success"),
  (response) => console.log("Response data:", response.data),
];
```

### Refresh an access token transparently

```typescript
let refreshing: Promise<void> | null = null;

request.config.hooks.failed = async (err, req) => {
  if (err === 401 && !refreshing) {
    refreshing = refreshToken().finally(() => (refreshing = null));
    await refreshing;
    req.resend?.(); // re-run the original call
    return false;  // suppress the original failure
  }
};
```

:::advance

## Type reference

### `RequestReturn`

```typescript
interface RequestReturn {
  headers: FastjsHeaders;          // native Headers + toArray() / toObject()
  response: Response;              // native Response
  data: RequestReturnData;         // parsed body, same as .then's first arg
  status: number;
  request: FastjsRequest;
  resend: () => FastjsRequest;
}
```

### `FailedParams`

```typescript
interface FailedParams<T extends Error | number> {
  error: T;
  request: FastjsRequest;
  intercept: boolean;
  hook: "before" | "init" | "success" | "failed" | null;
  response: RequestReturn | null;
  headers: FastjsHeaders | null;
  resend: () => FastjsRequest;
}
```

:::
