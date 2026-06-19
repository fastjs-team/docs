# Getting Started with Cookie

The cookie module is a tiny, safe wrapper around `document.cookie`:

- Names and values are encoded with `encodeURIComponent` automatically.
- `Max-Age`, `expires`, `path`, `domain`, `secure` and `SameSite` are all supported.
- When `document` is missing (e.g. SSR, Node), reads return `null` and writes are silently skipped — no thrown errors.

## Import Module

```typescript
import { cookie } from "jsfast";
```

## Set a cookie

```typescript
cookie.set("name", "value");
cookie.set("name", "value", { maxAge: 3600 }); // 1 hour
cookie.set("name", "value", { expires: 1000 * 60 * 60 }); // 1 hour (ms)
cookie.set("name", "value", { expires: new Date("2030-01-01") });
cookie.set("name", "value", {
  path: "/admin",
  domain: ".example.com",
  sameSite: "Lax",
  secure: true,
});
```

`set` returns the same scoped object as [`cookie.create`](#scoped-cookie-with-create), so you can chain `.set().set().remove()`.

## Get a cookie

```typescript
cookie.get("name"); // string | null
```

The value is decoded with `decodeURIComponent`. Cookies that contain malformed encoding fall back to the raw stored value.

## Check existence

```typescript
cookie.exists("name"); // boolean — true when cookie.get("name") !== null
```

## Remove a cookie

```typescript
cookie.remove("name");
cookie.remove("name", { path: "/admin", domain: ".example.com" });
```

:::warning Same scope
The browser keys cookies by `(name, path, domain)`. To delete a cookie you previously set with a custom `path` / `domain`, pass the **same** options to `remove`, otherwise the browser keeps the original cookie around.
:::

## Scoped cookie with `create`

`cookie.create(path?, domain?)` returns a `FastjsCookie` instance that pre-fills `path` and/or `domain` for every `set` / `remove` call:

```typescript
const adminCookie = cookie.create("/admin", ".example.com");

adminCookie.set("token", "abc"); // path=/admin; domain=.example.com
adminCookie.remove("token"); // same scope
adminCookie.get("token"); // reads from document.cookie globally
```

`set` / `remove` on the instance still accept per-call `options` that **override** the defaults.

## `CookieOptions`

| Field      | Type                          | Notes                                                                        |
| ---------- | ----------------------------- | ---------------------------------------------------------------------------- |
| `expires`  | `number \| Date`              | Number = ms from now; Date = absolute expiry; missing = session cookie       |
| `maxAge`   | `number`                      | `Max-Age` in **seconds** (takes precedence over `expires` when both are set) |
| `path`     | `string`                      | Path scope                                                                   |
| `domain`   | `string`                      | Domain scope (use `.example.com` to include subdomains)                      |
| `secure`   | `boolean`                     | Send only over HTTPS                                                         |
| `sameSite` | `"Strict" \| "Lax" \| "None"` | `"None"` automatically appends `Secure`                                      |

:::advance

#### Type Declaration

```typescript
type SameSite = "Strict" | "Lax" | "None";

interface CookieOptions {
  /** Number = ms from now; Date = absolute expiry; missing = session cookie */
  expires?: number | Date;
  /** Max-Age in seconds (takes precedence over expires when both are set) */
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  /** SameSite=None automatically adds Secure (required by browsers) */
  sameSite?: SameSite;
}
```

:::

## Notes & gotchas

1. **HttpOnly** cookies can only be set by the server, not from JavaScript.
2. **Size**: most browsers cap a single cookie at ~4 KB.
3. **Special characters** in the name (`.`, `+`, `*`, …) are handled — Fastjs escapes regex metacharacters when reading.
4. **SameSite=None** requires HTTPS. Fastjs automatically appends `Secure` to the cookie string, but the browser may still reject it on `http://`.
5. **SSR / Node**: calls are safe no-ops. In development mode a `fastjs/cookie` warning is logged so you don't silently lose data.

Every `FastjsCookie` also inherits the common [`FastjsModuleBase`](../common/module-base.md) helpers.

:::advance

## Instance type reference

```typescript
interface FastjsCookieAtom {
  construct: "FastjsCookie";
  path?: string;
  domain?: string;
}

interface FastjsCookieAPI {
  get(name: string): string | null;
  set(name: string, value: string, options?: CookieOptions): FastjsCookie;
  remove(name: string, options?: CookieOptions): FastjsCookie;
}

type FastjsCookie = FastjsCookieAtom & FastjsCookieAPI & FastjsModuleBase;
```

:::
