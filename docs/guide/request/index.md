# Getting Started with Request

## Advantages

- Tiny `fetch` wrapper – no extra dependencies, works in modern browsers and Node.js (≥ 18)
- Chainable `.then` / `.catch` / `.finally` with **two** arguments in the success callback
- Path parameters (`/posts/:id`), automatic query/body serialisation, built-in debouncing & cancellation
- First-class TypeScript generics for the response shape

## Import Module

```typescript
import { request } from "jsfast";
```

## Sending a request

Almost every project needs to send HTTP requests. With `FastjsRequest` the most common calls fit in one line:

```typescript
request.get("https://reqres.in/api/users").then((data) => {
  console.log(data);
});
```

Unlike `axios`, you do **not** need to write `res.data` to read the body – the first argument is already the parsed payload. The second argument carries the full response.

```typescript
import type { RequestReturn } from "jsfast";

request
  .get("https://reqres.in/api/users")
  .then((data, res: RequestReturn) => {
    console.log(res.status); // 200
  });
```

### `RequestReturn`

The `response` object exposes:

- `headers` — the native `Headers`, plus two helpers `toArray()` and `toObject()`.
- `response` — the original `Response`.
- `data` — the parsed body (same value passed to the first arg of `.then`).
- `status` — HTTP status code.
- `request` — the originating `FastjsRequest`.
- `resend()` — re-send the same request.

The `data` value carries a `getFullReturn()` helper via its prototype, so you can recover the `RequestReturn` from anywhere you only kept the data:

```typescript
const posts = await new Promise((resolve) => {
  request.get<Array<{ title: string }>>("/api/posts").then(resolve);
});
posts.getFullReturn().status; // 200
```

:::advance

#### `RequestReturn` Type Declaration

```typescript
interface RequestReturn {
  headers: FastjsHeaders;          // native Headers + toArray() / toObject()
  response: Response;              // the original Response
  data: RequestReturnData;         // same value passed to .then's first arg
  status: number;
  request: FastjsRequest;          // the originating request instance
  resend: () => FastjsRequest;     // re-send the same request
}

interface FastjsHeaders extends Headers {
  toArray(): Array<[string, string]>;
  toObject(): Record<string, string>;
}
```

:::

:::advance

### Learn More

When you "send" a request, Fastjs does not return a `Promise`. It stores your callbacks and returns the `FastjsRequest` instance so you can keep chaining calls and call sites:

```typescript
const req = request.create("https://reqres.in/api/users");

req
  .get({ page: 1 })
  .get({ page: 2 })
  .then((data) => {
    console.log(data); // called twice, once per get()
  });
```

This is also why the success callback gets two real arguments instead of going through a `.then(({ data, response }) => ...)` shape.

:::

## Sending data

Pass `data` as the **second** argument.

```typescript
request
  .post("https://reqres.in/api/login", {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  })
  .then((data) => {
    console.log(data); // { token: ... }
  });
```

### Query parameters

For methods **without** a body (`GET`, `HEAD`, `OPTIONS`), the `data` argument is serialised into the URL as a query string. Arrays become repeated keys; `null` / `undefined` values are skipped; existing `?` / `#` are preserved.

```typescript
request.get("https://reqres.in/api/users", { page: 1 });
// → GET https://reqres.in/api/users?page=1
```

For methods with a body (`POST`, `PUT`, `DELETE`, `PATCH`), use the `query` option in `config` (the third argument) to attach extra query parameters:

```typescript
request.post(
  "https://reqres.in/api/login",
  { email: "eve.holt@reqres.in", password: "cityslicka" },
  { query: { page: 1 } },
);
```

### Path parameters

You can put `:name` placeholders in the URL. Matching keys are pulled from `data` (URL-encoded), and **removed** from the data before the body / query is serialised. Missing keys leave the placeholder in place.

```typescript
request.delete("https://example.com/posts/:id", { id: 2 });
// → DELETE https://example.com/posts/2
```

### Body serialisation

| `data` type | Behaviour |
| --- | --- |
| Plain object | `JSON.stringify`; sets `Content-Type: application/json` if you didn't |
| `string` | Sent as-is, `Content-Type` untouched |
| `FormData` / `Blob` / `URLSearchParams` / `ArrayBuffer` / `TypedArray` / `ReadableStream` | Passed through to `fetch` directly |
| `null` / `undefined` | No body |

## Failed requests

A request fails when either the network errors out, the response status is not in `[200, 300)`, or a hook returns `false`. You can listen with `.catch`:

```typescript
import type { FailedParams } from "jsfast";

request
  .get("https://reqres.in/api/unknown")
  .then((data) => console.log(data))
  .catch((e: FailedParams<Error | number>) => {
    console.error(e.error, e.intercept, e.hook);
  });
```

### `FailedParams`

`error` is either an `Error` (network error or interception) or a `number` (the HTTP status code when the response code wasn't accepted). `intercept` and `hook` tell you whether the failure came from a hook returning `false`. `response` and `headers` are populated once Fastjs received an HTTP response.

:::advance

#### Type Declaration

```typescript
interface FailedParams<T extends Error | number> {
  /** Error instance (network/hook) or HTTP status code (non-2xx response) */
  error: T;
  request: FastjsRequest;
  /** true when a hook returned false */
  intercept: boolean;
  /** Name of the hook that aborted, if any */
  hook: "before" | "init" | "success" | "failed" | null;
  /** Present once we have an HTTP response */
  response: RequestReturn | null;
  headers: FastjsHeaders | null;
  /** Re-send the original request */
  resend: () => FastjsRequest;
}
```

:::

## Typing the response

Each shorthand accepts a generic for the response body. The type is reflected on both `.then` callback parameters:

```typescript
interface Post { id: number; title: string }

request
  .get<Post[]>("https://reqres.in/api/users")
  .then((data, res) => {
    data.forEach((p) => console.log(p.title));
    console.log(res.status);
  });
```

## Where to next

- [Scaling up](./advance.md) — headers, timeouts, debouncing, cancellation.
- [Add Hooks](./hooks.md) — global / per-instance hooks for the request lifecycle.
- [Create an Instance](./instance.md) — reuse the same URL / config across many calls.
