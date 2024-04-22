# Getting Start with Date

## Advantages

- Better solution for Function Encapsulation
- Enhance your code Maintainability
- Connect with other modules easily
- Modular Design

## Get a time string

A lot of projects need to get a time string from a specific format string, but this is not easy to do with built-in `Date` object.

But with `FastjsDate`, you can do it easily.

:::tip Format string
If you don't pass a format string, it will default to `Y-M-D h:m:s`.

Scroll down to see the format string table.
:::

```typescript
import { date } from 'jsfast'

date.string("Y-M-D h:m:s") // or
date.now("Y-M-D h:m:s")
```

How about convert a timestamp to a time string?

```typescript
import { date } from 'jsfast'

date.string("Y-M-D h:m:s", 1666351246)
```

Exactly, it is super easy to use.

:::advance
### Type Declaration

```typescript
declare const date: {
    string: (format: string, date?: number) => string;
    date: (format: string, date: string) => Date;
    reformat: (format: string, date: string, newFormat?: string) => string;
};
export default date;
```
:::

## Parsing a date string

Some date picker libraries may return a string of date, but you need to convert it to a timestamp.

We provide a function to parse a date string to a timestamp easily.

```typescript
date.parse()
```

### Using `parse` function

:::tip Format string
If you don't pass a format string, it will default to `Y-M-D h:m:s`.

For more information about format string, scroll down to see the [format string table](/guide/date-start.html#format-table).
:::

Function `parse` can parse a string or a timestamp to a `parseReturn` object.

There are some functions that help you to call `parse` easily, they all return a `parseReturn` object.

```typescript
date.parse("2022-10-21 19:20:46", "Y-M-D h:m:s")
date.parse(1666351246, "Y-M-D h:m:s")
date.parseDate("2022-10-21 19:20:46", "Y-M-D h:m:s")
date.parseTime(1666351246, "Y-M-D h:m:s")
date.now("Y-M-D h:m:s")
```

### Return Object

These all return an `parseReturn` object, and this object contains a lot of information.

| Key           | Description                    | Example                  |
|---------------|--------------------------------|--------------------------|
| format        | format string                  | Y-M-D h\:m:s             |
| date          | Date object                    | 2021-10-21T11:20:46.000Z |
| string        | string of Date                 | 2021-10-21 19:20:46      |
| dateString    | string of Date, same as string | 2021-10-21 19:20:46      |
| timestamp     | timestamp of Date              | 1666351246               |
| utcDate       | Date object of UTC             | 2021-10-21T11:20:46.000Z |
| utcTimestamp  | timestamp of UTC               | 1666351246               |
| utcDateString | string of UTC                  | 2021-10-21 19:20:46      |

:::advance
### Type Declaration

```typescript
declare const _default: {
    parse: (time: string | number, format?: string) => parseReturn;
    parseDate: (date: string, format?: string | undefined) => parseReturn;
    parseTime: (time: number, format?: string | undefined) => parseReturn;
    now: (format?: string | undefined) => parseReturn;
};
```

```typescript
export interface parseReturn {
    /** @description format string */
    format: string
    /** @description Date object */
    date: Date
    /** @description string of Date */
    string: string
    /** @description string of Date, same as string */
    dateString: string
    /** @description timestamp of Date */
    timestamp: number
    /** @description Date object of UTC */
    utcDate: Date
    /** @description timestamp of UTC */
    utcTimestamp: number
    /** @description string of UTC */
    utcDateString: string
}
```
:::

## Reformatting a date string

:::tip Format string
This is a simplified version of the [`parse` function](/guide/date-start.html#parsing-a-date-string), it only returns a string of the date.
:::

## Format Table

| Format | Description | Example  |
|--------|-------------|----------|
| Y      | Year        | 2021     |
| M      | Month       | 01       |
| D      | Day         | 01       |
| h      | Hour        | 01       |
| hh     | Hour with out prefix `0`       | 1        |
| m      | Minute      | 01       |
| mm     | Minute with out prefix `0`     | 1        |
| s      | Second      | 01       |
| ss     | Second with out prefix `0`     | 1        |
| S      | Millisecond | 613      |
| H      | Hour(12h)   | 01       |
| A      | AM/PM       | AM       |
| a      | am/pm       | am       |