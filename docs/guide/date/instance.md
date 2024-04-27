# Create a Instance

For some advanced usage, you can create a `FastjsDate` object and do what you want.

```typescript
const date: FastjsDate = date.create();
console.log(date.toString());
```

## Convert to string

:::tip What is active time(active string)?
When you're using `toActiveString`, the time will fly with real time by calculating the time difference between the creation time and the current time.
:::

:::tip Active time
If you want to get active time, you need to use `create` method to create a new instance.
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

::::advance

### Learn More

:::tip
The real code to implement `toString` is [more complex](https://github.com/fastjs-team/core/blob/main/src/date/date-methods.ts#L46) than you think, the code below is a simplified version for you to understand.
:::

How does `FastjsDate.toString()` work?

```typescript
function createDate(
  format?: string,
  date?: number | string | Date,
): FastjsDate {
  return {
    _date: __changeToTimestamp(date),
    toString(newFormat?: string): string {
      return __parseDate(this._date, newFormat || format);
    },
  };
}
```

Different to `toString`, `toActiveString` will calculate the time with `_createAt` to get the active time.

```typescript
return {
  _date: __changeToTimestamp(date),
  _createAt: Date.now(),
  toString(newFormat?: string): string,
  toActiveString(newFormat?: string): string {
    const date = this._date + (Date.now() - this._createAt);
    return __parseDate(date, newFormat || format);
  },
};
```

::::

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

### Example

Let's see an example, use `toNumber` and `toActiveNumber` to achieve the same effect.

```html
<div>
  <p>Timestamp: <span id="time"></span></p>
  <button id="btn">Refresh</button>
</div>
```

#### Original

```typescript
import { date, dom } from "jsfast";

dom.select("#btn").addEvent("click", () => {
  dom.select("#time").text(date.toNumber());
});
```

#### Active

```typescript
import { date, dom } from "jsfast";

const instance = date.create();
dom.select("#btn").addEvent("click", () => {
  dom.select("#time").text(instance.toActiveNumber());
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
  local?: boolean,
): FastjsDate;
```

### Instance Properties

:::tip Module API
If you want to check the methods of module or more information of each properties, please refer to [Date API](./api) page.
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
