# Utils API

Every helper described here is exported both as a top-level named export (`import { rand } from "jsfast"`) and on the `utils` namespace (`utils.rand`).

## Randomness

### `rand`

Random number in `[min, max]` (**both** ends inclusive).

- `decimal = 0` (default) → integer.
- `decimal > 0` → number with at most `decimal` digits after the dot.
- `decimal < 0` is clamped to 0.
- Swapped bounds (`min > max`) are auto-corrected.

```typescript
rand(0, 9); // → 0–9 integer
rand(0, 1, 2); // → "0.00"–"1.00"
rand(10, 1); // → same as rand(1, 10)
```

:::advance

The math is done in fixed-point (`Math.pow(10, decimal)`) so you don't see the usual float drift around `0.1 + 0.2`.

#### Type Declaration

```typescript
function rand(min: number, max: number, decimal?: number): number;
```

:::

### `randString`

Build a random string of `length` characters from a configurable alphabet.

```typescript
randString(10); // 10 lowercase letters
randString(10, { upper: true, lower: false }); // 10 uppercase letters
randString(10, { number: true, letter: false }); // 10 digits
randString(10, { custom: "!@#$" }); // lowercase + 4 symbols
randString(16, { number: true, upper: true, secure: true });
```

:::simple

:::tip Sensible defaults
Without options you get a 10-character lowercase string. Set `number: true` to mix in digits, `upper: true` to allow uppercase, etc.
:::

:::

:::advance

#### `RandStringOptions`

| Option   | Default | Description                                                               |
| -------- | ------- | ------------------------------------------------------------------------- |
| `max`    | –       | When set, the resulting length is randomised in `[length, max]`           |
| `number` | `false` | Include digits `0–9`                                                      |
| `letter` | `true`  | Include letters at all                                                    |
| `upper`  | `false` | Include uppercase letters (only when `letter`)                            |
| `lower`  | `true`  | Include lowercase letters (only when `letter`)                            |
| `custom` | –       | Extra characters to draw from (`string` or `string[]`)                    |
| `secure` | `false` | Use `crypto.getRandomValues` with rejection sampling for an unbiased draw |

`secure: true` requires `crypto.getRandomValues` to be available; otherwise it falls back to `Math.random` and logs a development-mode warning.

#### Type Declaration

```typescript
function randString(
  length: number,
  options?: Partial<RandStringOptions>,
): string;

interface RandStringOptions {
  max: number;
  number: boolean;
  letter: boolean;
  upper: boolean;
  lower: boolean;
  custom: string | string[];
  secure: boolean;
}
```

:::

### `uuid`

```typescript
uuid(); // "550e8400-e29b-41d4-a716-446655440000"
```

RFC 4122 v4 UUID.

:::advance

The implementation prefers `crypto.randomUUID()`, falls back to `crypto.getRandomValues()`, and finally to `Math.random()`. The last branch is **not** cryptographically secure and should only happen in very old environments.

#### Type Declaration

```typescript
function uuid(): string;
```

:::

## Clipboard

### `copy`

Copy `text` to the system clipboard. Returns `true` on success, `false` otherwise.

```typescript
const ok = await copy("Hello!");
if (!ok) alert("Could not copy, please copy manually.");
```

- Tries `navigator.clipboard.writeText` first (requires a secure context — HTTPS or `localhost`).
- Falls back to a hidden `<textarea>` + `document.execCommand("copy")` when needed.
- Returns `false` (with a development-mode warning) if there is no `document` at all.

:::advance

#### Type Declaration

```typescript
function copy(text: string): Promise<boolean>;
```

:::

## Control flow

### `callUntilEnd`

Call `func` every `timeout` milliseconds until it returns a truthy value. Useful for polling.

```typescript
await callUntilEnd(
  async () => {
    const data = await fetchSomething();
    return data.ready; // truthy → stop
  },
  500,
  true,
);
```

- `immediate = true` runs the first call right away; otherwise the first call waits for `timeout`.
- `continueEvenError = true` keeps polling after `func` throws (the error is logged); otherwise the rejection is forwarded.

:::advance

The `end` parameter passed to `func` is a getter that returns `true` after Fastjs has decided the polling is over — handy for inner cleanup in long-running async functions.

#### Type Declaration

```typescript
function callUntilEnd(
  func: (end: () => boolean) => Promise<boolean | void> | boolean | void,
  timeout: number,
  immediate?: boolean,
  continueEvenError?: boolean,
): Promise<void>;
```

:::

### `catchError`

Run `func`, capture any thrown / rejected error, and either delegate to `onError` or `console.error`.

```typescript
catchError(
  () => JSON.parse(maybeJson),
  (err) => toast(err.message),
);
const data = await catchError(async () => api.get("/posts"));
```

The return value is the same as `func`'s; when an error occurred it's the `Error` instance (or `Promise<Error>`).

:::advance

#### Type Declaration

```typescript
function catchError(
  func: () => Promise<any> | any,
  onError?: (error: Error) => void,
): Promise<any> | any;
```

:::

### `secureCall`

Go-style tuple result. Returns `[value, null]` on success and `[undefined, error]` on failure. Synchronous when `func` is synchronous, a `Promise` of the tuple otherwise.

```typescript
const [value, err] = secureCall(() => JSON.parse(input));
if (err) toast(err.message);

const [posts, err2] = await secureCall(async () => api.get("/posts"));
```

:::advance

#### Type Declaration

```typescript
function secureCall(
  func: () => Promise<any> | any,
): [any, Error | null] | Promise<[any, Error | null]>;
```

:::

## Type guards

Used inside Fastjs itself to discriminate generic inputs; useful when you accept "anything DOM-ish":

```typescript
import { isDom } from "jsfast";

function mount(host: FastjsDom | HTMLElement) {
  const wrap = isDom(host) ? host : dom.newEl(host);
  wrap.addClass("mounted");
}
```

:::advance

#### Type Declaration

```typescript
function isDom(value: any): value is FastjsDom;
function isDomList(value: any): value is FastjsDomList;
function isUndefined(value: any): value is undefined;
```

:::
