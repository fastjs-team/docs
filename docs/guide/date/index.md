# Getting Started with Date

## Advantages

- Tiny, dependency-free replacement for the most common `Date` chores
- Two-way `format` ↔ `Date` conversion using the same token string
- Built-in timezone handling and "active time" (time that keeps ticking)
- Works in both browsers and Node.js — pure computation, no DOM access required

## Import Module

```typescript
import { date } from "jsfast";
```

## Get a time string

A lot of projects need to print a time as a string – `Date.toString()` is rarely what you want and `Intl.DateTimeFormat` is heavy. `date.string` takes the same token string as everything else in this module.

:::tip Format string
If you don't pass a format, the default is `"Y-M-D h:m:s"`.

The complete list of tokens is in the [Format Table](#format-table) below.
:::

```typescript
date.string("Y-M-D h:m:s");                 // current time
date.string("Y-M-D h:m:s", 1666351246000);  // convert a timestamp
date.string();                              // same as date.string("Y-M-D h:m:s")
```

:::advance

### Type Declaration

```typescript
function string(format?: string, date?: number): string;
```

:::

## Parse a date string

Some date pickers hand you a string and you need a timestamp (or a `Date`) back. `date.parse` is the main entry point.

```typescript
date.parse(1666351246000);
```

### Using `parse`

:::tip Format string
If you omit `format`, it defaults to `"Y-M-D h:m:s"`.
:::

:::warning Misunderstanding
The `format` you pass to `parse` describes the **input string**, not the output string. To re-format an existing string see [reformat](#reformat-a-date-string).
:::

`parse` takes a string, number or `Date` and returns a [`parseReturn`](#return-object) object. There are a few convenience wrappers for clarity:

```typescript
date.parse("2022-10-21 19:20:46", "Y-M-D h:m:s");
date.parse(1666351246000);
date.parseDate("2022-10-21 19:20:46", "Y-M-D h:m:s"); // alias for "input is a string"
date.parseTime(1666351246000, "Y-M-D h:m:s");          // alias for "input is a timestamp"
date.now("Y-M-D h:m:s");                               // current time as parseReturn
```

:::tip Missing fields
When the input string only covers part of the format (for example just `"2024"` against `"Y"`), the year/month/day fields fall back to the current date and the time fields fall back to `0`. The result is built in **one step** via `new Date(y, m, d, h, mi, s, ms)`, so a value like `"31-01"` will never roll over into the next month.
:::

### Return object

`parse` and its friends all return a `parseReturn`:

| Key             | Description                              | Example                  |
| --------------- | ---------------------------------------- | ------------------------ |
| `format`        | format string actually used              | `Y-M-D h:m:s`            |
| `date`          | local `Date` object                      | `2022-10-21T11:20:46.000Z` |
| `string`        | formatted local string (same as `dateString`) | `2022-10-21 19:20:46` |
| `dateString`    | formatted local string                   | `2022-10-21 19:20:46`    |
| `timestamp`     | UTC timestamp (milliseconds)             | `1666351246000`          |
| `utcDate`       | `Date` shifted by the current timezone   | `2022-10-21T19:20:46.000Z` |
| `utcTimestamp`  | timestamp shifted by the current timezone | `1666380046000` |
| `utcDateString` | formatted string from `utcTimestamp`     | `2022-10-21 19:20:46`    |

:::advance

### Type Declaration

```typescript
function parse(time: string | number | Date, format?: string): parseReturn;
function parseDate(date: string, format?: string): parseReturn;
function parseTime(time: number, format?: string): parseReturn;
function now(format?: string): parseReturn;

interface parseReturn {
  format: string;
  date: Date;
  string: string;
  dateString: string;
  timestamp: number;
  utcDate: Date;
  utcTimestamp: number;
  utcDateString: string;
}
```

:::

## Reformat a date string

:::tip Simplified parse
`date.reformat` is a thin wrapper around [`parse`](#using-parse): it only returns the formatted string.
:::

```typescript
date.reformat("D/M/Y", "21/10/2022", "Y-M-D");
// → "2022-10-21 00:00:00"

date.reformat("<Today is> Y-M-D", "Today is 2022-10-21", "Y/M/D");
// → "2022/10/21"
```

### Type Declaration

```typescript
function reformat(format: string, date: string, newFormat?: string): string;
```

## Format Table

> Single- and double-character tokens (`m`/`mm`, `s`/`ss`, `h`/`hh`) have **the same meaning**. Both are padded to two digits on output. `Y` is padded to four digits and `S` to three.

| Token   | Description                                | Example |
| ------- | ------------------------------------------ | ------- |
| `Y`     | Year (4 digits)                            | `2025`  |
| `M`     | Month, 1–12                                | `06`    |
| `D`     | Day, 1–31                                  | `19`    |
| `h`     | Hour, **24-hour**, 0–23                    | `09`    |
| `hh`    | Same as `h` (kept for visual consistency)  | `09`    |
| `H`     | Hour, **12-hour**, 1–12                    | `09`    |
| `m`     | Minute, 0–59                               | `07`    |
| `mm`    | Same as `m`                                | `07`    |
| `s`     | Second, 0–59                               | `32`    |
| `ss`    | Same as `s`                                | `32`    |
| `S`     | Millisecond (3 digits)                     | `045`   |
| `A`     | `AM` / `PM`                                | `AM`    |
| `a`     | `am` / `pm`                                | `am`    |
| `<...>` | Literal segment, kept verbatim, not parsed | `<Now>` |

:::warning Common pitfalls
- `H` parses as 12-hour and **requires** `A` or `a` to disambiguate, otherwise an error is thrown in development mode.
- Two `parse`-relevant tokens cannot sit next to each other in the same format string (e.g. `"hh"` is treated as the same token, but `"hm"` two distinct tokens). For ambiguous outputs add a separator (e.g. `"h:m"`).
:::

### Literal segments with `< >`

Any text inside `< ... >` is left as-is and ignored by the parser, so it round-trips perfectly:

```typescript
date.string("<Today is> Y-M-D");
// → "Today is 2025-06-19"

date.parseDate("Today is 2025-06-19", "<Today is> Y-M-D").date;
// → Date for 2025-06-19
```

You can use it to mix in plain text (Chinese, Japanese, emoji, …) without escaping individual characters.
