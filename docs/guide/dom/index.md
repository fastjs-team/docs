# Getting Started with Dom

With Fastjs's dom module, you can operate on DOM elements with simple, type-safe code.

Some APIs of Fastjs's dom module look like jQuery, but they don't behave the same way.
Fastjs redesigned the surface so the same chain works across single elements and lists, and so TypeScript can give you strong type hints without any extra packages.

## Import Module

```typescript
import { dom } from "jsfast";
```

::::simple

:::tip One module, two return types
`dom()` may return either a single element wrapper (`FastjsDom`) or a list wrapper (`FastjsDomList`). Both expose the same chainable surface, so most of the time you don't have to care which one you got — Fastjs will dispatch the call correctly.
:::

::::

:::advance

> The `dom` module relies on `document` and `window`. In non-browser environments it will warn in development mode and throw on actual access. Use [type guards](../utils/api#type-guards) such as `isDom` / `isDomList` if you need to discriminate at runtime.

:::

## Select an element

:::tip Different from jQuery
Fastjs does not register a global `$`. Import `dom` and call `dom()` or `dom.select()` to query the DOM.
:::

`dom()` is callable and also has helper methods on it. `dom.select` is an alias of `dom()`.

```typescript
dom("#id"); // FastjsDom | null
dom(".class"); // FastjsDomList | null
dom("tag"); // FastjsDomList | null
dom(); // FastjsDom (defaults to body)
```

### Return value rules

The same call may return either a single `FastjsDom` or a `FastjsDomList`, depending on the selector:

| Selector form | Return |
| --- | --- |
| `body` / `head` | `FastjsDom` |
| `#id` or `tag#id` (single id selector) | `FastjsDom` |
| Anything else (`.class`, `tag`, compound selectors) | `FastjsDomList` (even if it matched only one element) |
| No match | `null` |

:::advance

You can constrain the return type with a generic when using TypeScript:

```typescript
import type { FastjsDom, FastjsDomList } from "jsfast";

const idElement = dom.select<FastjsDom>("#id");
const classElements = dom.select<FastjsDomList>(".class");
```

Even better, pass the underlying element type to get full property type-hints:

```typescript
import type { FastjsDom, FastjsDomList } from "jsfast";

const input = dom.select<FastjsDom<HTMLInputElement>>("#search");
input?.set("placeholder", "Search…"); // strongly typed against HTMLInputElement
```

:::

### Limit the search scope

You can pass a parent element (or `FastjsDom` / `FastjsDomList`) as the second argument:

```typescript
const list = dom("#list");
dom(".item", list); // search inside #list only
dom.select("img", document.head);
```

## Operate on an element

Whatever you selected, you can use the same chainable methods – see [the full list](./api.md).

### Using `FastjsDom`

After you selected a single `FastjsDom`, you can operate on it:

```typescript
dom("#title")!.html("Hello World");
```

### Using `FastjsDomList`

:::tip Method dispatch
When the same method exists on both `FastjsDom` and `FastjsDomList`, the list’s own implementation is used (for example `each`). Otherwise the call is forwarded to **every** member of the list.
:::

`FastjsDomList` has a few list-specific methods (`add`, `delete`, `each`, `getDom`, …) and forwards anything else to every `FastjsDom` in it.

```typescript
import { dom } from "jsfast";

dom(".class")!.html("Hello World");
// equivalent to
dom(".class")!.each((el) => el.html("Hello World"));
```

## Create an element

Use `dom.newEl()` (also exposed as `createFastjsDom` internally) to create a brand-new element that is **detached** from the document until you mount it with `push` / `insert`.

```typescript
dom.newEl("div");
```

### Set properties

The second argument is an object that mixes a few special keys with any **writable** property on the underlying element.

```typescript
dom.newEl("div", {
  id: "card",
  textContent: "Hello World",
});
```

### Set styles

`css` accepts either a `CSSStyleDeclaration`-like object or a raw `cssText` string.

```typescript
dom.newEl("div", {
  css: {
    color: "red",
    backgroundColor: "black",
  },
});

dom.newEl("div", {
  css: "color: red; background-color: black;",
});
```

### Set attributes

`attr` accepts an object whose values are `string | null` (use `null` to remove an attribute).

```typescript
dom.newEl("a", {
  attr: {
    href: "/home",
    "data-id": "1",
    rel: null, // explicitly removes the attribute
  },
});
```

### Set content

Three short-hands for the most common content writes:

```typescript
dom.newEl("div", { text: "Hello World" });
dom.newEl("div", { html: "<h1>Hello World</h1>" });
dom.newEl("input", { val: "Hello World" });
```

### Set classes

`class` accepts a string (space-separated) or an array.

```typescript
dom.newEl("div", { class: "card card--primary" });
dom.newEl("div", { class: ["card", "card--primary"] });
```

### Mounting the element

`dom.newEl` only creates the node; mount it with `push` or `insert`:

```typescript
dom.newEl("button", { text: "OK" })
  .push(dom.select("#app")!, "lastElementChild");
```

See [`push`](./api.md#fastjsdom-push) and [`insert`](./api.md#fastjsdom-insert) for the full options.

## Create a list

Wrap an array of nodes / `FastjsDom` into a `FastjsDomList` with `dom.newElList`. `null` / `undefined` are skipped automatically.

```typescript
const list = dom.newElList([
  dom.newEl("li", { text: "A" }),
  dom.newEl("li", { text: "B" }),
  document.querySelector("li.existing"),
]);

list.addClass("item").push(dom.select("#list")!);
```
