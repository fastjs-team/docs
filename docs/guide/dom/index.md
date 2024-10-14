# Getting Start with Dom

With Fastjs's dom module, you can operate dom elements with simple codes.

Some API of Fastjs's dom module looks like jQuery, but not fully the same way.

Fastjs redesigned a lot of API to help you write in different ways, and we provide strongly type support without any extra packages.

## Import Module

```typescript
import { dom } from "jsfast";
```

## Select a element

:::tip Different with jQuery
Fastjs doesn't register a global variable `$` to select elements, import `dom` and use `dom.select()` to select elements.
:::

Select a element to operate is usually the things you need to do first, you can do this easliy with `dom.select()`

```typescript
dom.select("#id"); // FastjsDom | null
dom.select(".class"); // FastjsDomList | null
dom.select("tag"); // FastjsDomList | null
```

With strongly type support with your typescript project, you can define the return type of `dom.select()`.

```typescript
import type { FastjsDom, FastjsDomList } from "jsfast";

const idElement = dom.select<FastjsDom>("#id");
const classElement = dom.select<FastjsDomList>(".class");
const spanElement = dom.select<FastjsDomList>("span");
```

Or even better with defining the type of the element.

```typescript
import type { FastjsDom, FastjsDomList } from "jsfast";

const idElement = dom.select<FastjsDom<HTMLDivElement>>("#id");
const classElement = dom.select<FastjsDomList<HTMLAnchorElement>>(".class");
const tagElement = dom.select<FastjsDomList<HTMLSpanElement>>("span");
```

## Operate a element

Either you select a single element or a list of elements, you can operate them with some [methods](./api.md).

### Using FastjsDom

After you select a **FastjsDom** element, you can operate it with some [methods](./api.md).

```typescript
dom.select("h1")!.html("Hello World");
```

### Using FastjsDomList

:::tip
If there are a same method in **FastjsDom** and **FastjsDomList**, fastjs will use the method of **FastjsDomList**.

For example, `each` method is in both **FastjsDom** and **FastjsDomList**, but when you use `each` method on **FastjsDomList**, `FastjsDomList.each` will be called.
:::

There are some special methods for **FastjsDomList**. But you can also use the methods of **FastjsDom**.

When you are using the methods of **FastjsDom** on **FastjsDomList**, it will apply to all elements in the list one by one.

```typescript
import { dom } from "jsfast";

dom(".class")!.html("Hello World");
// equals to
dom(".class")!.each((element: FastjsDom) => element.html("Hello World"));
```

## Create a element

You can create a element with `dom.create()`.

```typescript
dom.create("div");
```

### Set Properties

You can set properties to the element by passing an object to the second parameter.

```typescript
dom.create("div", {
  id: "id",
  innerText: "Hello World",
});
```

### Set Styles

You can set styles to the element by different ways.

```typescript
dom.create("div", {
  css: {
    color: "red",
    backgroundColor: "black",
  },
});
dom.create("div", {
  css: "color: red; background-color: black;",
});
```

### Set Attributes

You can set attributes by passing an object to the `attr` key.

```typescript
dom.create("div", {
  attr: {
    "data-id": "id",
  },
});
```

### Set Content

You can set content to the element by setting the `text` or `html` or `val` key.

```typescript
dom.create("div", {
  text: "Hello World",
});
dom.create("div", {
  html: "<h1>Hello World</h1>",
});
dom.create("input", {
  val: "Hello World",
});
```

### Set Class

You can set class to the element by setting the `class` key.

```typescript
dom.create("div", {
  class: "class1 class2",
});
dom.create("div", {
  class: ["class1", "class2"],
});
```
