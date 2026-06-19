# FastjsDom API

This page lists every method exposed by `FastjsDom`. All write methods return the same `FastjsDom` (or `FastjsDomList` when called through one) so they can be chained.

> Looking for the list-level methods? They are documented inline at the end of this page – see [`FastjsDomList` extras](#fastjsdomlist-extras).

```typescript
import { dom } from "jsfast";
import type { FastjsDom, FastjsDomList } from "jsfast";
```

## Content

### `FastjsDom.get`

Read any property from the underlying element. Typed via the element generic.

```typescript
dom.select<FastjsDom<HTMLInputElement>>("#name")!.get("value");
```

### `FastjsDom.set`

Write any **writable** property of the underlying element.

```typescript
dom.select("#title")!.set("textContent", "Hello World");
```

:::advance
In development mode a warning is logged when the target property is not writable; in production the assignment is silently skipped.
:::

### `FastjsDom.text`

Read or write the element's `textContent`.

```typescript
dom.select("#title")!.text(); // "Hello"
dom.select("#title")!.text("Hello World"); // returns FastjsDom
```

### `FastjsDom.html`

Read or write the element's `innerHTML`.

```typescript
dom.select("#card")!.html();
dom.select("#card")!.html("<h1>Hello World</h1>");
```

### `FastjsDom.val`

Read or write the live `value` of form controls (`<input>`, `<textarea>`, `<select>`).

```typescript
dom.select<FastjsDom<HTMLInputElement>>("#name")!.val();
dom.select<FastjsDom<HTMLInputElement>>("#name")!.val("admin");
```

> `val()` returns the user's current input. Use `text()` only when you want the initial markup content.

### `FastjsDom.el`

Return the underlying DOM node.

```typescript
dom.select("#root")!.el(); // HTMLElement
```

## Node lifecycle

### `FastjsDom.remove`

Detach the element from the document.

```typescript
dom.select("#tip")!.remove();
```

### `FastjsDom.focus`

Call the underlying element's `focus()`.

```typescript
dom.select("#input")!.focus();
```

## Tree navigation

| Method            | Description                                          | Return                               |
| ----------------- | ---------------------------------------------------- | ------------------------------------ |
| `first()`         | First **element** child                              | `FastjsDom \| null`                  |
| `last()`          | Last **element** child                               | `FastjsDom \| null`                  |
| `father()`        | `parentElement` wrapped                              | `FastjsDom \| null`                  |
| `children()`      | All direct element children                          | `FastjsDomList`                      |
| `next(selector?)` | Re-query **inside** this element. Defaults to `"*"`. | `FastjsDom \| FastjsDomList \| null` |

```typescript
const root = dom.select("#root")!;
root.first()?.text("first child");
root.children().each((el) => el.addClass("item"));

const img = root.next<FastjsDom>("img.hero");
```

### `FastjsDom.each`

Iterate over direct children. Pass `true` as the second argument to walk the whole subtree.

```typescript
dom.select("#tree")!.each((el, raw, index) => {
  el.setAttr("data-index", String(index));
}, true);
```

## Styles

### `FastjsDom.getStyle`

```typescript
dom.select("#x")!.getStyle(); // a reactive style Proxy
dom.select("#x")!.getStyle("color"); // string
dom.select("#x")!.getStyle((style, el) => console.log(style));
```

The Proxy reads inline styles first and falls back to `getComputedStyle`. Writing into the Proxy forwards to `setStyle`, so you can set inline styles directly:

```typescript
const style = dom.select("#x")!.getStyle();
console.log(style.color);
style.backgroundColor = "tomato"; // same as setStyle('background-color', 'tomato')
```

:::advance

#### Type Declaration

```typescript
function getStyle(): StyleObj; // reactive Proxy
function getStyle(key: keyof CSSStyleDeclaration): string;
function getStyle(
  callback: (style: StyleObj, dom: FastjsDom) => void,
): FastjsDom;
```

:::

### `FastjsDom.setStyle`

```typescript
dom.select("#card")!.setStyle({ color: "white", backgroundColor: "#333" });
dom.select("#card")!.setStyle("color: red; padding: 8px;");
dom.select("#card")!.setStyle("display", "none", true); // !important
```

> CamelCase keys are converted to kebab-case automatically.

:::advance

#### Type Declaration

```typescript
function setStyle(style: SetStyleObj): FastjsDom; // batch; null values are ignored
function setStyle(style: string): FastjsDom; // direct cssText
function setStyle(
  key: StyleObjKeys,
  val: string,
  important?: boolean,
): FastjsDom;
```

:::

## Classes

| Method                                           | Description                                           |
| ------------------------------------------------ | ----------------------------------------------------- |
| `getClass()`                                     | Returns a copy of `classList` as `string[]`           |
| `getClass(callback)`                             | Same array passed to the callback (no return value)   |
| `setClass(name, value?)`                         | Toggle one class. `value` defaults to `true`          |
| `setClass({ [name]: boolean })`                  | Toggle many at once                                   |
| `addClass(...names)` / `addClass(names[])`       | Add one or many classes; spaces in a string are split |
| `removeClass(...names)` / `removeClass(names[])` | Remove one or many classes                            |
| `clearClass()`                                   | Reset `className` to an empty string                  |

```typescript
dom
  .select("#nav")!
  .addClass("primary", "fixed")
  .removeClass("hidden")
  .setClass({ active: true, disabled: false });

dom.select("#nav")!.clearClass(); // empty className
```

## Attributes

```typescript
dom.select("a")!.getAttr(); // { href: "/home", ... }
dom.select("a")!.getAttr("href"); // "/home" or null
dom.select("a")!.setAttr({ href: "/home", target: "_blank" });
dom.select("a")!.setAttr("rel", null); // removes rel
```

- `getAttr()` returns a Proxy: read attribute names off it, or assign to mutate the DOM.
- `setAttr` with `null` removes the attribute.

:::advance

#### Type Declaration

```typescript
function getAttr(): { [key: string]: string };
function getAttr(key: string): string | null;
function getAttr(callback: (attrs, dom: FastjsDom) => void): FastjsDom;

function setAttr(attrs: { [key: string]: string | null }): FastjsDom;
function setAttr(key: string, val: string | null): FastjsDom;
```

:::

## Events

### `FastjsDom.addEvent`

The callback receives the `FastjsDom` first so it can keep chaining inside the handler.

```typescript
dom.select("button")!.addEvent("click", (el, e) => {
  el.setClass("active", !el.getClass().includes("active"));
  console.log(e.type);
});
```

:::advance

#### Type Declaration

```typescript
addEvent(
  type: keyof HTMLElementEventMap,
  callback: (el: FastjsDom, event: Event) => void,
): FastjsDom;
```

:::

### `FastjsDom.removeEvent`

Four overloads to cover the most common removal patterns:

| Call                     | Removes                                                |
| ------------------------ | ------------------------------------------------------ |
| `removeEvent()`          | **All** listeners registered by Fastjs on this element |
| `removeEvent(type)`      | Every listener of the given event type                 |
| `removeEvent(callback)`  | Every entry whose `callback === callback`              |
| `removeEvent(type, key)` | The entry at `_events[key]` for the given type         |

```typescript
const handler = () => console.log("hi");
const el = dom.select("button")!;
el.addEvent("click", handler);
el.removeEvent(handler); // by callback
el.removeEvent("click"); // by type
el.removeEvent(); // wipe everything
```

## Insertion

`push` and `insert` are the two complementary insertion APIs:

- `a.push(b, target)` → "place `a` somewhere relative to `b`"
- `a.insert(b, target)` → "place `b` somewhere relative to `a`"

### `FastjsDom.push`

`target` is one of `"firstElementChild" | "lastElementChild" | "randomElementChild" | "beforeElement" | "afterElement" | "replaceElement" | number`.

- `el` defaults to `document.body`.
- `target` defaults to `"lastElementChild"`.
- `clone = true` inserts a clone, leaving the original in place.
- `"replaceElement"` ignores `el` and replaces the **current** element with itself (used together with `clone: true` to swap in a fresh copy).
- A numeric `target` inserts the element at position `target` of `el.children`.

```typescript
dom
  .newEl("div", { text: "Hi" })
  .push(dom.select("#container")!, "firstElementChild");
```

:::advance

#### Type Declaration

```typescript
type PushTarget =
  | "firstElementChild"
  | "lastElementChild"
  | "randomElementChild"
  | "beforeElement"
  | "afterElement"
  | "replaceElement"
  | number;

function push<T extends PushTarget>(
  el?: HTMLElement | FastjsDomList | FastjsDom,
  target?: T,
  clone?: boolean,
): PushReturn<T, ElementType>;

interface PushReturn<T, ElementType extends ElementList> {
  isReplace: T extends "replaceElement" ? true : false;
  newElement: T extends "replaceElement" ? FastjsDom : never;
  oldElement: T extends "replaceElement" ? FastjsDom<ElementType> : never;
  /** Index in the parent's children; -1 when it can't be computed */
  index: number;
  /** Always points at the newly placed node */
  el: FastjsDom;
  /** The FastjsDom that .push was called on */
  origin: FastjsDom<ElementType>;
  father: FastjsDom | null;
}
```

:::

### `FastjsDom.insert`

`target` is one of `"first" | "last" | "random" | "before" | "after" | number`.

- `target` defaults to `"last"`.
- `clone = true` inserts a clone of `el`.

```typescript
dom.select("#button")!.insert(dom.newEl("div", { class: "tooltip" }), "after");
```

:::advance

#### Type Declaration

```typescript
type InsertTarget = "first" | "last" | "random" | "before" | "after" | number;

function insert<T extends InsertTarget>(
  el: HTMLElement | FastjsDomList | FastjsDom,
  target?: T,
  clone?: boolean,
): InsertReturn<ElementType>;

interface InsertReturn<ElementType extends ElementList> {
  index: number;
  added: FastjsDom;
  origin: FastjsDom<ElementType>;
}
```

:::

## `FastjsDomList` extras

`FastjsDomList` also behaves like an array (`list[0]`, `list.length`, `Array.prototype` methods) and forwards `FastjsDom` calls to every member. In addition, it exposes a few list-only helpers:

| Method                                | Description                                                     |
| ------------------------------------- | --------------------------------------------------------------- |
| `add(el)`                             | Push a `FastjsDom` onto the list                                |
| `delete(key, deleteDom = true)`       | Remove the entry at `key`; also detaches the element by default |
| `each(callback)`                      | `(el, raw, index) => void` over each member                     |
| `el(key = 0)` / `getElement(key = 0)` | Get the underlying DOM node at index                            |
| `getDom(key = 0)`                     | Get the `FastjsDom` at index                                    |
| `next(selector?)`                     | Re-query inside **all** elements; defaults to `"*"`             |
| `toArray()`                           | Return the internal array reference (still a `FastjsDomList`)   |
| `toElArray()`                         | Return a copy of the underlying DOM nodes                       |

```typescript
dom(".item")!
  .each((el, _, i) => el.setAttr("data-i", String(i)))
  .delete(0) // remove the first one
  .next<FastjsDomList>("img");
```
