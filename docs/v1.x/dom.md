# Element

:::tip Authoritative document
This page is for senior users. If you are a junior user, you can skip this page.
:::

## Create Element

```typescript
function constructor(el: HTMLElement | string) {}
```

FastjsDom receives `tagname<string>`

```javascript
import { FastjsDom } from 'fastjs-next';

const element = new FastjsDom("div");
```

If you already have a element, and just want to use FastjsDom to manage it, you can give parameter `element<HTMLElement>` to FastjsDom.

```javascript
import { FastjsDom } from 'fastjs-next';

const element = document.createElement("div");
const fastjsDom = new FastjsDom(element);
```

## Set index

Use `html` or `text` to set the index of the element.

```javascript
import { selecter as $ } from 'fastjs-next';

$("body").html("<h1>Hello World</h1>");
```

## Get index

Use `html` or `text` to get the index of the element.

```javascript
import { selecter as $ } from 'fastjs-next';

console.log($("body").html()); // <h1>Hello World</h1>
```

## Set attribute

Use `attr` to set the attribute of the element.

```javascript
import { selecter as $ } from 'fastjs-next';

$("body").attr("id", "body");
```

## Get attribute

Use `attr` to get the attribute of the element.

```javascript
import { selecter as $ } from 'fastjs-next';

console.log($("body").attr("id")); // body
```

## Set style

Use `css` to set the style of the element.

```javascript
import { selecter as $ } from 'fastjs-next';

$("body").css("background-color", "red");
```

## Event

Use `on` to add event to the element.

```javascript
import { selecter as $ } from 'fastjs-next';

$("body").on("click", () => {
    console.log("click");
});
```

## Change to Element

### FastjsDom

Use `el()` to change FastjsDom to Element.

```javascript
import { selecter as $ } from 'fastjs-next';

console.log($("body").el()); // Element
```

### FastjsDomList

Use `getEl(index)` to get FastjsDom, index default is 0.

```javascript
import { selecter as $ } from 'fastjs-next';

console.log($("body").getEl().el()); // Element
```

## Add element

Use `append` to add element.

```javascript
import { selecter as $, FastjsDom } from 'fastjs-next';

let div = new FastjsDom("div")
$("body").append(div);
```

## Add to place

:::warning
Please give an Element, not FastjsDom or FastjsDomList.
:::

### Add to end

Use `append` or `push` to add the element to the end of the place.

```javascript
import { selecter as $, FastjsDom } from 'fastjs-next';

let div = new FastjsDom("div");
div.html("Hello World");
div.appendTo($("body").el());
```

### Add to start

Use `addFirst` to add    the element to the start of the place.

```javascript
import { selecter as $, FastjsDom } from 'fastjs-next';

let div = new FastjsDom("div");
div.html("Hello World");
div.addFirst($("body").el());
```

## Access element

:::tip
You can also use `el(index)` to get the element.
:::

Use `get(index)` or `set(index, value)` to operate element.

```javascript
import { selecter as $ } from 'fastjs-next';

$("body").set("innerHTML", "<h1>Hello World</h1>");
console.log($("body").get("innerHTML")); // <h1>Hello World</h1>
```

## Get Parent

Use `parent()` to get the parent of the element.

```javascript
import { selecter as $ } from 'fastjs-next';

$("body").html("<div></div>");
console.log($("div").parent()); // FastjsDom -> body
```

## Get Child

:::warning
It only work on FastjsDom.
:::

Use `first` or `last` to get the first or last child of the element.

```javascript
import { selecter as $ } from 'fastjs-next';

$("body").html("<span></span><div></div>");
console.log($("body").first()); // FastjsDom -> span
console.log($("body").last()); // FastjsDom -> div
```

## Focus

Use `focus()` to focus input element.

:::warning
It only work on FastjsDom.
:::

```javascript
import { selecter as $ } from 'fastjs-next';

$("input")[0].focus();
```
## Demo

### Create and push to body

```javascript
import { FastjsDom } from 'fastjs-next';

let div = new FastjsDom("div");
div.html("Hello World")
   .css({
       "color": "green",
       "font-size": "20px",
       "font-weight": "bold"
   })
   .appendTo();
```