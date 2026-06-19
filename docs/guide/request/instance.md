# Create a Request Instance

When the same URL / headers / hooks are reused across many calls, build a `FastjsRequest` instance with `request.create(...)` and re-trigger it instead of repeating yourself.

- The instance is **not** sent immediately. Call `.get()` / `.post()` / `.send("METHOD")` to dispatch.
- Re-triggering reuses the stored `url`, `data` and `config`, merging in any per-call overrides.
- All callbacks registered via `.then` / `.catch` / `.finally` are re-used on every dispatch (see [Multi callback](#multi-callback)).

:::advance

#### Type Declaration

```typescript
function create(
  url?: string,
  data?: RequestData | null,
  config?: Partial<RequestConfig>,
): FastjsRequest;
```

:::

## Send multiple requests

:::tip Request hooks
This page assumes you've already read [Request Hooks](./hooks).
:::

Pick a single endpoint and decide on success/failure paths once:

```typescript
import { request } from "jsfast";
import type { FailedParams } from "jsfast";

const userApi = request.create("https://api.com/user", null, {
  hooks: {
    init: (req) => console.log("dispatching", req.request?.url),
  },
});

userApi
  .get()
  .then((res) => console.log("logged in", res))
  .catch((e: FailedParams<Error | number>) => {
    if (e.error === 403) {
      // 403 Unauthorized → log in and retry
      userApi.post({ email: "x", password: "y" });
    }
  });
```

## Bind a base config per instance

Different endpoints often need different headers (e.g. a service-account token). Each instance keeps its own config:

```typescript
const userApi = request.create("https://api.com/users", null, {
  headers: { Authorization: "Bearer token" },
});

function getUserInfo() {
  return userApi.get(undefined, "https://api.com/users/getUserInfo");
}

function logout() {
  return userApi.post(undefined, "https://api.com/users/logout");
}
```

> The shorthand methods accept `(data?)` / `(url?)` / `(data?, url?)` / `(url, data?)` overloads. Passing `undefined` for data and a string second argument is a clean way to override the URL.

## Multi callback

Every `.then` / `.catch` / `.finally` registration takes three arguments:

- `callback` – the actual handler.
- `repeat` (default `false`) – fire once then auto-unregister; set `true` to fire on every dispatch.
- `method` – only fire when this request was sent with the matching HTTP method.

This lets one instance handle several "modes" of the same endpoint cleanly:

```typescript
import { request } from "jsfast";

const userApi = request
  .create("https://api.com/users")
  .then(
    (data) => {
      if (!data.loggedIn) userApi.post({ email: "x", password: "y" });
    },
    true, // repeat on every dispatch
    "GET", // only for GET responses
  )
  .then(
    () => {
      location.href = "/dashboard";
    },
    true,
    "POST", // only for POST responses
  )
  .then(console.log, true); // log every successful response

function getUserInfo() {
  return userApi.get();
}

function login() {
  return userApi.post({ email: "x", password: "y" });
}
```

## Cancel and `finally`

`abort(reason?)` works on instances too – it cancels both an in-flight `fetch` **and** a pending debounce timer. `finally` callbacks run after both success and failure paths:

```typescript
const search = request.create("/api/search", { q: "" }, { wait: 250 });

input.addEvent("input", (el) => {
  search.data.q = el.val();
  search.get(); // debounced
});

window.addEventListener("beforeunload", () => {
  search.abort("page is leaving");
});

search.finally((req) => {
  console.log("done; status:", req.response?.status);
}, true);
```

## Instance fields

A `FastjsRequest` is the intersection of an atom (containing the raw state) and the API methods, plus the inherited [`FastjsModuleBase`](../common/module-base.md) (minus `then`, which has request-specific semantics here).

You can read these fields inside hooks – e.g. `request.request?.url` for the resolved URL after path-parameter substitution.

:::advance

#### `FastjsRequestAtom` Type Declaration

```typescript
interface FastjsRequestAtom {
  readonly construct: "FastjsRequest";
  url?: string;
  data: RequestData;
  config: RequestConfig;
  callback: RequestCallback;
  request?: Request; // built right before fetch()
  response?: Response; // populated after fetch()
  wait?: ReturnType<typeof setTimeout> | null; // debounce timer
  abortController?: AbortController;
}
```

:::
