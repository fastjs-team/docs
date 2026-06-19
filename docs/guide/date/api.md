# FastjsDate API

This page lists every property and method on a `FastjsDate` instance.

A `FastjsDate` is the intersection of `FastjsDateAtom`, `FastjsDateAPI` and [`FastjsModuleBase`](../common/module-base.md), so methods like `setCustomProp`, `then`, `setCustomEvent` are also available on every instance.

:::advance

#### Type Declaration

```typescript
import type { FastjsDate } from "jsfast";

export interface FastjsDateAtom {
  construct: "FastjsDate";
  format: string;
  _date: number;
  _createAt: number;
  timezoneDiff: number;
}

export interface FastjsDateAPI {
  changeDate(time: number | string): FastjsDate;
  changeFormat(format: string): FastjsDate;
  setZone(zone: number): FastjsDate;
  refresh(): FastjsDate;

  toNumber(utc?: boolean): number;
  toActiveNumber(utc?: boolean): number;

  toString(): string;
  toString(showAs: "utc" | "local" | number): string;
  toString(newFormat: string): string;
  toString(showAs: "utc" | "local" | number, newFormat: string): string;

  toActiveString(): string;
  toActiveString(showAs: "utc" | "local" | number): string;
  toActiveString(newFormat: string): string;
  toActiveString(showAs: "utc" | "local" | number, newFormat: string): string;
}
```

:::

## Properties

### `FastjsDate.format`

:::tip
For the token reference, see [Format Table](./#format-table).
:::

Default format used by [`toString`](#fastjsdate-tostring) / [`toActiveString`](#fastjsdate-toactivestring). Mutate it with [`changeFormat`](#fastjsdate-changeformat) or override per call.

```typescript
type format = string;
```

### `FastjsDate._date`

Internal UTC timestamp (milliseconds). Mutate it with [`changeDate`](#fastjsdate-changedate).

```typescript
type _date = number;
```

### `FastjsDate._createAt`

Timestamp of the moment the instance was created. Used by `toActive*` to compute elapsed time. Reset with [`refresh`](#fastjsdate-refresh).

```typescript
type _createAt = number;
```

### `FastjsDate.timezoneDiff`

:::warning Treat as read-only
Set it with [`setZone`](#fastjsdate-setzone). Touching the field directly is allowed but discouraged.
:::

Stored offset between UTC and the instance's "local" view, expressed in **milliseconds**. Defaults to the browser's `getTimezoneOffset()` at construction time.

```typescript
type timezoneDiff = number;
```

## Methods

### `FastjsDate.changeDate`

Replace the stored time. A `string` is parsed against the current `format`. Also resets `_createAt`, so `toActive*` starts ticking from "now" again.

```typescript
date.create().changeDate("2025-01-01 00:00:00");
date.create().changeDate(Date.now());
```

:::advance

```typescript
changeDate(time: number | string): FastjsDate;
```

:::

### `FastjsDate.changeFormat`

:::warning
Affects every subsequent `toString` / `toActiveString` and `changeDate(string)` call.
:::

```typescript
date.create().changeFormat("Y/M/D h:m");
```

:::advance

```typescript
changeFormat(format: string): FastjsDate;
```

:::

### `FastjsDate.setZone`

Set the offset between UTC and the instance's "local" view, in **hours**. `8` means UTC+8, `0` means UTC, `-5` means UTC-5.

```typescript
date.create().setZone(8); // UTC+8
date.create().setZone(0); // UTC
```

:::advance

```typescript
setZone(zone: number): FastjsDate;
```

:::

### `FastjsDate.refresh`

:::warning
Affects `toActiveString` / `toActiveNumber` – they will start counting from "now" again.
:::

Reset `_createAt` to the current time.

:::advance

```typescript
refresh(): FastjsDate;
```

:::

### `FastjsDate.toNumber`

Return the stored timestamp.

| `utc`            | Returns                                                                         |
| ---------------- | ------------------------------------------------------------------------------- |
| `true` (default) | The raw UTC timestamp                                                           |
| `false`          | The timestamp shifted by `timezoneDiff` (i.e. how the instance "looks" locally) |

:::advance

```typescript
toNumber(utc?: boolean): number;
```

:::

### `FastjsDate.toActiveNumber`

Same as `toNumber`, but adds `(Date.now() - _createAt)` so the value keeps ticking forward. Use it to build clocks or stopwatches that don't drift.

:::advance

```typescript
toActiveNumber(utc?: boolean): number;
```

:::

### `FastjsDate.toString`

Format the stored time as a string. Overloads:

| Call                         | Behaviour                                    |
| ---------------------------- | -------------------------------------------- |
| `toString()`                 | Use the default `format`, render in **UTC**. |
| `toString("utc")`            | Same as the no-arg form.                     |
| `toString("local")`          | Apply `timezoneDiff` first, then format.     |
| `toString(8)`                | Treat `8` as a manual UTC+8 offset (hours).  |
| `toString("Y/M/D")`          | Override the format string only.             |
| `toString("local", "Y/M/D")` | Combine timezone + override format.          |

```typescript
const d = date.create();
d.toString(); // UTC
d.toString("local"); // browser timezone
d.toString(8); // UTC+8
d.toString("Y/M/D h:m"); // custom format, UTC
d.toString("local", "Y/M/D"); // custom format + local timezone
```

:::advance

#### Type Declaration

```typescript
toString(): string;
toString(showAs: "utc" | "local" | number): string;
toString(newFormat: string): string;
toString(showAs: "utc" | "local" | number, newFormat: string): string;
```

:::

### `FastjsDate.toActiveString`

Same overloads as `toString`, but the underlying time is `toActiveNumber()` instead of `toNumber()`, so the result moves forward in real time.

:::tip
See [Convert to string](./instance.md#convert-to-string) for a worked example (clock + stopwatch).
:::

:::advance

#### Type Declaration

```typescript
toActiveString(): string;
toActiveString(showAs: "utc" | "local" | number): string;
toActiveString(newFormat: string): string;
toActiveString(showAs: "utc" | "local" | number, newFormat: string): string;
```

:::
