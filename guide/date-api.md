# Date API

This shows all the methods and properties of the `FastjsDate` class.

```typescript
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
export type FastjsDate = FastjsDateAtom & FastjsDateAPI & FastjsModuleBase;
```

## Properties

### `FastjsDate.format`

The format of the date.

```typescript
class FastjsDate {
  format: string;
}
```

### `FastjsDate._date`

The timestamp of the date.

```typescript
class FastjsDate {
  _date: number;
}
```

### `FastjsDate._createAt`

The timestamp of the date created.

```typescript
class FastjsDate {
  _createAt: number;
}
```

### `FastjsDate.timezoneDiff`

The difference between the local time and UTC time.

```typescript
class FastjsDate {
  timezoneDiff: number;
}
```

## Methods

### `FastjsDate.changeDate(time: number | string): FastjsDate`

Change the date of the instance.

```typescript
class FastjsDate {
  changeDate(time: number | string): FastjsDate;
}

date.changeDate("2021-01-01 00:00:00"); // Change the date to "2021-01-01 00:00:00"
```

### `FastjsDate.changeFormat(format: string): FastjsDate`

:::warning
It will effect to the return value of `toString` and `toActiveString`.
:::

Change the format of the date.

```typescript
class FastjsDate {
  changeFormat(format: string): FastjsDate;
}

date.changeFormat("YYYY-MM-DD"); // Change the format to "YYYY-MM-DD"
```

### `FastjsDate.setZone(zone: number): FastjsDate`

Set the timezone difference.

```typescript
class FastjsDate {
  setZone(zone: number): FastjsDate;
}

date.setZone(8); // Set the timezone difference to UTC+8
```

### `FastjsDate.refresh(): FastjsDate`

:::warning
It will effect to the return value of `toActiveString` and `toActiveNumber`.
:::

Refresh the create time of the instance.

```typescript
class FastjsDate {
  refresh(): FastjsDate;
}
```

### `FastjsDate.toNumber(utc?: boolean): number`

Get the timestamp of the date.

```typescript
class FastjsDate {
  toNumber(utc?: boolean): number;
}

date.toNumber(); // Get the timestamp of the date
```

### `FastjsDate.toActiveNumber(utc?: boolean): number`

Get the active timestamp of the date.

```typescript
class FastjsDate {
  toActiveNumber(utc?: boolean): number;
}

date.toActiveNumber(); // Get the active timestamp of the date
```

### `FastjsDate.toString`

Get the date as a string.

```typescript
class FastjsDate {
  toString(): string;
  toString(showAs: "utc" | "local" | number): string;
  toString(newFormat: string): string;
  toString(showAs: "utc" | "local" | number, newFormat: string): string;
}
```

#### `FastjsDate.toString(): string`

```typescript
date.toString(); // Get the date as a string
```

#### `FastjsDate.toString(showAs: "utc" | "local" | number): string`

```typescript
date.toString("utc"); // Get the date as a string in UTC
date.toString("local"); // Get the date as a string in local time
date.toString(8); // Get the date as a string in UTC+8
```

#### `FastjsDate.toString(newFormat: string): string`

```typescript
date.toString("YYYY-MM-DD"); // Get the date as a string with format "YYYY-MM-DD"
```

#### `FastjsDate.toString(showAs: "utc" | "local" | number, newFormat: string): string`

```typescript
date.toString("utc", "YYYY-MM-DD"); // Get the date as a string in UTC with format "YYYY-MM-DD"
date.toString("local", "YYYY-MM-DD"); // Get the date as a string in local time with format "YYYY-MM-DD"
date.toString(8, "YYYY-MM-DD"); // Get the date as a string in UTC+8 with format "YYYY-MM-DD"
```

### `FastjsDate.toActiveString`

:::tip
About what does the props do, see [FastjsDate.toString](/guide/date-api.html#fastjsdate-tostring)
:::

Get the active date as a string.

```typescript
class FastjsDate {
  toActiveString(): string;
  toActiveString(showAs: "utc" | "local" | number): string;
  toActiveString(newFormat: string): string;
  toActiveString(showAs: "utc" | "local" | number, newFormat: string): string;
}
```