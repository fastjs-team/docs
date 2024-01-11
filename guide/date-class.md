# Using FastjsDate

For some advanced usage, you can new a `FastjsDate` object and do what you want.

```typescript
import { FastjsDate } from 'jsfast'

const date = new FastjsDate()
console.log(date.toString())
```

Or use the method in `date` module.

```typescript
import { date } from 'jsfast'

const date = date.create()
console.log(date.toString())
```

:::advance
### Type Declaration

```typescript
declare class FastjsDate extends FastjsBaseModule<FastjsDate> {
    constructor(format: string, date: fDate);
    constructor(format: string, date: number | string, isUTC?: boolean);
}
```

```typescript
declare function create(format: string, date: fDate): FastjsDate;
declare function create(format: string, date: number | string, isUTC?: boolean): FastjsDate;

declare const date: {
    create: typeof create; // -> declare function create
};
```
:::

## Convert to string

:::tip What is active time(active string)?
When you're using `toActiveString`, the time will fly with real time.
:::

:::tip Active time
If you want to get active time, you need to use `create` method or new a `FastjsDate` object.
:::

```typescript
import { FastjsDate } from 'jsfast'

const date = new FastjsDate()
const str = date.toString()
const activeStr = date.toActiveString()
```

:::advance

## FastjsDate.toString()

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
:::

### Relative - `FastjsDate.toNumber()`

Use `FastjsDate.toNumber()` to get timestamp.

```typescript
class FastjsDate {
    toNumber(): number {
        return this._date;
    }
}
```

## FastjsDate.toActiveString()

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

### Relative - `FastjsDate.toActiveNumber()`

Use `FastjsDate.toActiveNumber()` to get active timestamp.

```typescript
class FastjsDate {
    toActiveNumber(): number {
        return this._date + (Date.now() - this._createAt);
    }
}
```

### Difference to `toString`

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

## UTC and Local time switch

With `FastjsDate`, you can switch between UTC and local time easily.

### Local time to UTC

```typescript
import { FastjsDate } from 'jsfast'

const date = new FastjsDate()
const utcDate = date.convertUTC("local")
sendToServer("finishTime", utcDate.toString())
```

### UTC to Local time

```typescript
import { FastjsDate } from 'jsfast'

requestFromServer("finishTime").then((utcDate) => {
    const date = new FastjsDate("Y-M-D h:m:s", utcDate, true)
    const localDate = date.convertUTC("utc")
    showToUser(localDate.toString())
})
```

## Set Timezone

:::tip Default timezone
If you don't set a specific timezone, the default timezone will be user's browser timezone.
:::

When you want to set a specific timezone before you convert to UTC/local time, you can use `setZone` method.

```typescript
import { FastjsDate } from 'jsfast'

const date = new FastjsDate()
date.setZone(1)
// 1 is the timezone offset(e.g. Germany, France)
const utcDate = date.convertUTC("local").toString()
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
import { FastjsDate } from 'jsfast'

const date = new FastjsDate() // -> 2021-10-21 19:20:44
setTimeout(() => {
    date.refresh()  // -> 2021-10-21 19:20:45
    setTimeout(() => {
        console.log(date.toString()) // output: 2021-10-21 19:20:46
    }, 1000)
}, 1000)
```