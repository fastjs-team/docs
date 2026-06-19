# Getting Started with Utils

`utils` is the catch-all module for the small stand-alone helpers that don't deserve a module of their own: random number / string / UUID, clipboard copy, polling, error handling, type guards.

## Import Module

```typescript
// Recommended: named imports, tree-shake friendly
import {
  rand,
  randString,
  uuid,
  copy,
  callUntilEnd,
  catchError,
  secureCall,
} from "jsfast";

// Namespace form (every helper is also on `utils`)
import { utils } from "jsfast";
utils.rand(0, 100);
```

::::simple

:::tip Two import styles
The two styles are equivalent — pick whichever reads better in your code. Named imports are easier to tree-shake when you only use a few helpers.
:::

::::

:::advance

Every helper exported on `utils.*` is also available as a top-level named export, and vice-versa. Type guards (`isDom`, `isDomList`, `isUndefined`) are exported via the top level only.

:::

## Quick tour

```typescript
import { rand, randString, uuid, copy, secureCall } from "jsfast";

rand(1, 100); // integer in [1, 100]
rand(0, 1, 2); // two-decimal-places number in [0, 1]
randString(8, { number: true }); // 8 lowercase letters + digits
uuid(); // RFC 4122 v4 UUID

await copy("Copied!"); // returns true on success

const [json, err] = await secureCall(() => JSON.parse(input));
```

The next page lists every helper with full signatures and edge cases: see [Utils API](./api.md).
