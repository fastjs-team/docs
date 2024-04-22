# Using FastjsDate

For some advanced usage, you can create a `FastjsDate` object and do what you want.

```typescript
const date: FastjsDate = date.create();
console.log(date.toString());
```

## Convert to string

:::tip What is active time(active string)?
When you're using `toActiveString`, the time will fly with real time by calculating the `_createAt` and `_date`.
:::

:::tip Active time
If you want to get active time, you need to use `create` method or new a `FastjsDate` object.
:::

```typescript
import { FastjsDate } from "jsfast";

const date = new FastjsDate();
const str = date.toString();
const activeStr = date.toActiveString();
```

### Example

Let's see an example of string conversion, including `toString` and `toActiveString`.

```typescript
import { FastjsDate } from "jsfast";

const date = new FastjsDate();
setInterval(() => {
  console.log(date.toString()); // This will not change
  console.log(date.toActiveString()); // This will change every second
}, 1000);
```

:::tip Use case
This is just an example of active string, you can also use other methods to achieve the same effect. `e.g. date.string()`
:::

Good, display a clock with active string on your page.

```vue
<template>
  <div>Now Time: {{ time }}</div>
</template>

<script setup>
import { ref } from "vue";
import { FastjsDate } from "jsfast";

const date = new FastjsDate();
const time = ref(date.toActiveString());

setInterval(() => {
  time.value = date.toActiveString();
}, 1000);
</script>
```

:::advance

### `FastjsDate.toString()`

How does `FastjsDate.toString()` work?

```typescript
class FastjsDate {
  _date: number;

  constructor(_a, date: number | string | fDate = Date.now(), _c) {
    this._date = __changeToTimestamp(date);
  }

  toString(newFormat?: string): string {
    return __parseDate(this._date, newFormat || this.format);
  }
}
```

### `FastjsDate.toActiveString()`

How does `FastjsDate.toActiveString()` work?

```typescript
class FastjsDate {
  _date: number;
  _createAt: number;

  constructor(_a, date: number | string | fDate = Date.now(), _c) {
    this._date = __changeToTimestamp(date);
    this._createAt = Date.now();
  }

  toActiveString(newFormat?: string): string {
    const date = this._date + (Date.now() - this._createAt);
    return __parseDate(date, newFormat || this.format);
  }
}
```

:::

## Convert to timestamp

Use `FastjsDate.toNumber()` to get timestamp.

```typescript
import { FastjsDate } from "jsfast";

const date = new FastjsDate();
const timestamp = date.toNumber();
```

Also, use `FastjsDate.toActiveNumber()` to get active timestamp.

```typescript
import { FastjsDate } from "jsfast";

const date = new FastjsDate();
setInterval(() => {
  console.log("Now Time:", date.toActiveNumber()); // This will change every second
}, 1000);
```

:::advance

### `FastjsDate.toNumber()`

Use `FastjsDate.toNumber()` to get timestamp.

```typescript
class FastjsDate {
  toNumber(): number {
    return this._date;
  }
}
```

### `FastjsDate.toActiveNumber()`

Use `FastjsDate.toActiveNumber()` to get active timestamp.

```typescript
class FastjsDate {
  toActiveNumber(): number {
    return this._date + (Date.now() - this._createAt);
  }
}
```

#### Difference to `toString`

```diff
class FastjsDate {
    _date: number;
+   _createAt: number;

    constructor(_a, date: number | string | fDate = Date.now(), _c) {
        this._date = __changeToTimestamp(date);
+       this._createAt = Date.now();
    }

    mergedFunc(newFormat?: string): string {
-       return __parseDate(this._date, newFormat || this.format);
+       const date = this._date + (Date.now() - this._createAt);
+       return __parseDate(date, newFormat || this.format);
    }
}
```

:::

## UTC and Local time switch

With `FastjsDate`, you can switch between UTC and local time easily.

### Local time to UTC

```typescript
import { FastjsDate } from "jsfast";

const date = new FastjsDate();
const utcDate = date.convertUTC("local");
sendToServer("finishTime", utcDate.toString());
```

### UTC to Local time

```typescript
import { FastjsDate } from "jsfast";

requestFromServer("finishTime").then((utcDate) => {
  const date = new FastjsDate("Y-M-D h:m:s", utcDate, true);
  const localDate = date.convertUTC("utc");
  showToUser(localDate.toString());
});
```

## Set Timezone

:::tip Default timezone
If you don't set a specific timezone, the default timezone will be user's browser timezone.
:::

When you want to set a specific timezone before you convert to UTC/local time, you can use `setZone` method.

```typescript
import { FastjsDate } from "jsfast";

const date = new FastjsDate();
date.setZone(1);
// 1 is the timezone offset(e.g. Germany, France)
const utcDate = date.convertUTC("local").toString();
```

## Refresh Create Time

:::tip Use case
You can use this skill to reset FastjsDate to current time.
:::

:::warning Misunderstanding
When you just want to show current time like a clock(even refresh every second), you don't need to use this skill, just use `toActiveString` method.
:::

When you want to refresh the creation time of date, you can use `refresh` method.

```typescript
import { FastjsDate } from "jsfast";

const date = new FastjsDate(); // -> 2021-10-21 19:20:44
setTimeout(() => {
  date.refresh(); // -> 2021-10-21 19:20:45
  setTimeout(() => {
    console.log(date.toString()); // output: 2021-10-21 19:20:46
  }, 1000);
}, 1000);
```

## Type Declaration

Here is the type declaration of `FastjsDate` module instance.

### New Instance

```typescript
declare function createFastjsDate(
  format?: string,
  date?: number | string | Date,
  local?: boolean
): FastjsDate;
```

### Instance Properties

:::tip Module API
If you want to check the methods of module or more information of each properties, please refer to [Date API](./date-api.md) page.
:::

```typescript
export interface FastjsDateAtom {
  construct: "FastjsDate";
  format: string;
  _date: number;
  _createAt: number;
  timezoneDiff: number;
}
```
