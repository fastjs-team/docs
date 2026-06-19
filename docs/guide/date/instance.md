# Create a Date Instance

For more advanced workflows you can create a `FastjsDate` and reuse it across calls.

:::warning Not a class
`FastjsDate` is **a TypeScript type only**. The runtime constructor is `date.create(...)` (a.k.a. the internal `createFastjsDate`). Do **not** write `new FastjsDate()` — there is no exported class.
:::

```typescript
import { date } from "jsfast";
import type { FastjsDate } from "jsfast";

const d: FastjsDate = date.create();
console.log(d.toString());
```

`date.create` accepts three optional arguments:

- `format` (default `"Y-M-D h:m:s"`) — the format used when reading / writing strings.
- `date` (default `Date.now()`) — initial value. Strings are parsed against `format`; a `Date` is reduced to its timestamp.
- `local` (default `false`) — set to `true` to shift the **internally stored** UTC timestamp by the current timezone offset. Useful when the input value is already "local wall-clock time".

:::advance

#### Type Declaration

```typescript
function create(
  format?: string,
  date?: number | string | Date,
  local?: boolean,
): FastjsDate;
```

:::

## Convert to string

:::tip What is active time?
The "active" variants (`toActiveString` / `toActiveNumber`) keep ticking based on the wall clock. They add the difference between **now** and the moment the instance was created (or last `refresh()`-ed) to the stored timestamp.
:::

```typescript
const d = date.create();
d.toString(); // frozen snapshot
d.toActiveString(); // changes as real time passes
```

### Example: a ticking clock

```typescript
import { date } from "jsfast";

const clock = date.create();
setInterval(() => {
  console.log(clock.toString()); // does NOT change
  console.log(clock.toActiveString()); // ticks every second
}, 1000);
```

:::tip Use case
This is just one way to display a clock; `date.string()` works too if you don't care about creating an instance.
:::

Wiring it up in Vue:

```vue
<template>
  <div>Now: {{ time }}</div>
</template>

<script setup>
import { ref } from "vue";
import { date } from "jsfast";

const clock = date.create();
const time = ref(clock.toActiveString());

setInterval(() => {
  time.value = clock.toActiveString();
}, 1000);
</script>
```

::::advance

### How does `toString` work?

The real implementation is [a bit more involved](https://github.com/fastjs-team/core/blob/main/packages/core/src/date/date-methods.ts), but conceptually:

```typescript
function createDate(format, time) {
  return {
    _date: toTimestamp(time),
    toString(newFormat) {
      return formatTimestamp(this._date, newFormat || format);
    },
  };
}
```

`toActiveString` additionally uses `_createAt` to compute the elapsed time:

```typescript
return {
  _date: toTimestamp(time),
  _createAt: Date.now(),
  toString(newFormat) {
    /* ... */
  },
  toActiveString(newFormat) {
    const live = this._date + (Date.now() - this._createAt);
    return formatTimestamp(live, newFormat || format);
  },
};
```

::::

## Convert to timestamp

Use `toNumber()` for the stored timestamp and `toActiveNumber()` for the "ticking" one.

```typescript
const d = date.create();
const frozen = d.toNumber();

setInterval(() => {
  console.log(d.toActiveNumber()); // increases by ~1000 each call
}, 1000);
```

### Example: refresh-on-click vs live timer

```html
<div>
  <p>Timestamp: <span id="time"></span></p>
  <button id="btn">Refresh</button>
</div>
```

**Refresh on click:**

```typescript
import { date, dom } from "jsfast";

dom.select("#btn")!.addEvent("click", () => {
  dom.select("#time")!.text(String(date.now().timestamp));
});
```

**Live ticking (use `toActiveNumber`):**

```typescript
import { date, dom } from "jsfast";

const live = date.create();
dom.select("#btn")!.addEvent("click", () => {
  dom.select("#time")!.text(String(live.toActiveNumber()));
});
```

## Set the timezone

:::tip Default timezone
If you don't override anything, the instance is initialised with the **browser's** timezone offset.
:::

`setZone(offset)` sets the **timezone offset in hours** (e.g. `8` for UTC+8, `0` for UTC). It affects `toNumber(false)` and `toString("local")`:

```typescript
const d = date.create("Y-M-D h:m:s", "2025-06-19 09:00:00");

// Display the same instant under UTC+8 wall clock:
d.setZone(8);
d.toString("local"); // "2025-06-19 09:00:00" (wall clock in UTC+8)
d.toString(); // UTC representation of the same instant
```

`toString` also accepts the offset directly without mutating the instance:

```typescript
date.create().toString(8); // UTC+8 wall clock for "now"
date.create().toString("local"); // browser timezone
```

## Refresh the create time

:::tip Use case
Use this when you want `toActive*` to count from a fresh "now". You don't need it just to print the current time – use `toActiveString` directly.
:::

```typescript
import { date } from "jsfast";

const d = date.create(); // 2025-06-19 09:20:00
setTimeout(() => {
  d.refresh(); // baseline reset to 09:20:01
  setTimeout(() => {
    console.log(d.toActiveString()); // 09:20:02
  }, 1000);
}, 1000);
```

## Type Reference

:::tip Module API
For the per-method docs, see [Date API](./api).
:::

Every `FastjsDate` is the intersection of an atom (raw state), the API methods, and the common [`FastjsModuleBase`](../common/module-base.md) helpers (`setCustomProp`, `then`, `setCustomEvent`, …).

:::advance

The runtime constructor:

```typescript
function createFastjsDate(
  format?: string,
  date?: number | string | Date,
  local?: boolean,
): FastjsDate;
```

The instance structure (atomic part):

```typescript
export interface FastjsDateAtom {
  construct: "FastjsDate";
  format: string;
  _date: number;
  _createAt: number;
  timezoneDiff: number;
}

export type FastjsDate = FastjsDateAtom & FastjsDateAPI & FastjsModuleBase;
```

:::
