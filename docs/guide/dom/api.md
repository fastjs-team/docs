# FastjsDom API

This page list all the API of FastjsDom.

## FastjsDom.get

Get a property of the element.

```typescript
dom.select("#id")!.get("innerText");
```

## FastjsDom.set

Set a property of the element.

```typescript
dom.select("#id")!.set("innerText", "Hello World");
```

## FastjsDom.text

### Get text

Get the text of the element.

```typescript
dom.select("#id")!.text();
```

### Set text

Set the text of the element.

```typescript
dom.select("#id")!.text("Hello World");
```

## FastjsDom.html

### Get html

Get the html of the element.

```typescript
dom.select("#id")!.html();
```

### Set html

Set the html of the element.

```typescript
dom.select("#id")!.html("<h1>Hello World</h1>");
```

## FastjsDom.val

### Get value

Get the value of the element.

```typescript
dom.select("#id")!.val();
```

### Set value

Set the value of the element.

```typescript
dom.select("#id")!.val("Hello World");
```

## FastjsDom.el

Get the element.

```typescript
dom.select("#id")!.el();
```

## FastjsDom.remove

Remove the element.

```typescript
dom.select("#id")!.remove();
```

## FastjsDom.focus

Focus the element.

```typescript
dom.select("#id")!.focus();
```

## FastjsDom.first

Get the first child element.

```typescript
dom.select("#id")!.first();
```

## FastjsDom.last

Get the last child element.

```typescript
dom.select("#id")!.last();
```

## FastjsDom.father

Get the father element.

```typescript
dom.select("#id")!.father();
```

## FastjsDom.children

Get the children elements. Return FastjsDomList.

```typescript
dom.select("#id")!.children();
```

## FastjsDom.next

Select inside the element.

```typescript
dom.select("#id")!.next(".class");
```

## FastjsDom.each

Loop the children elements.

```typescript
dom.select("#id")!.each((element) => {
  console.log(element);
});
// deep loop
dom.select("#id")!.each((element) => {
  console.log(element);
}, true);
```

## FastjsDom.addEvent

Add event listener to the element.

```typescript
dom.select("#id")!.addEvent("click", (el: FastjsDom, e: Event) => {
  console.log("click");
});
```

## FastjsDom.removeEvent

Remove event listener from the element by key or function.

```typescript
const fn = (el: FastjsDom, e: Event) => {
  console.log("click");
};
dom.select("#id")!.addEvent("click", fn);
// remove by these ways
dom.select("#id")!.removeEvent("click");
dom.select("#id")!.removeEvent("click", 0);
dom.select("#id")!.removeEvent(fn);
```

## FastjsDom.getStyle

Get the style of the element.

```typescript
dom.select("#id")!.getStyle(); // CSSStyleObject
dom.select("#id")!.getStyle("color"); // string
dom.select("#id")!.getStyle((style, dom: FastjsDom) => {
  console.log(style); // CSSStyleObject
});
```

## FastjsDom.setStyle

Set the style of the element.

```typescript
dom.select("#id")!.setStyle({
  color: "red",
  backgroundColor: "black",
});
dom.select("#id")!.setStyle("color", "red");
dom.select("#id")!.setStyle("color", "red", true); // important
```

## FastjsDom.getClass

Get the class of the element.

```typescript
dom.select("#id")!.getClass(); // string[]
dom.select("#id")!.getClass((list: string[], dom: FastjsDom) => {
  console.log(classList); // ["class1", "class2"]
});
```

## FastjsDom.setClass

Set the class of the element.

```typescript
dom.select("#id")!.setClass("class", true); // default is true
dom.select("#id")!.setClass({
  class1: true,
  class2: false,
});
```

## FastjsDom.addClass

Add class to the element.

```typescript
dom.select("#id")!.addClass("class1", "class2");
dom.select("#id")!.addClass("class1 class2", "class3");
dom.select("#id")!.addClass(["class1", "class2"]);
```

## FastjsDom.removeClass

Remove class from the element.

```typescript
dom.select("#id")!.removeClass("class1", "class2");
dom.select("#id")!.removeClass("class1 class2", "class3");
dom.select("#id")!.removeClass(["class1", "class2"]);
```

## FastjsDom.clearClass

Clear all class from the element.

```typescript
dom.select("#id")!.clearClass();
```

## FastjsDom.getAttr

Get the attribute of the element.

```typescript
dom.select("#id")!.getAttr(); // Object
dom.select("#id")!.getAttr("data-id"); // string
```

## FastjsDom.setAttr

Set the attribute of the element.

```typescript
dom.select("#id")!.setAttr("data-id", "id");
dom.select("#id")!.setAttr({
  "data-id": "id",
});
```

## FastjsDom.push

Push the element to a target element.

```typescript
type PushTarget = number
 | "firstElementChild"
 | "lastElementChild"
 | "randomElementChild"
 | "beforeElement" 
 | "afterElement" 
 | "replaceElement"

function push<T extends PushTarget>(
  el: HTMLElement | FastjsDomList | FastjsDom,
  target: T,
  clone?: boolean
  ): PushReturn<T>;
```

Example:

```typescript
dom.create("div").push(dom.select("#app"), "lastElementChild")
```

It will return a `PushReturn<T>` object.

```typescript
type PushReturn<T> = {
  isReplace: T extends "replaceElement" ? true : false;
  newElement: T extends "replaceElement" ? FastjsDom : never;
  oldElement: T extends "replaceElement" ? FastjsDom : never;
  index: number;
  el: FastjsDom;
  origin: FastjsDom;
  father: FastjsDom | null;
}
```

## FastjsDom.insert

Insert a element to it.

```typescript
type InsertTarget = number | "after" | "before" | "first" | "last" | "random"

function insert<T extends InsertTarget>(
  el: HTMLElement | FastjsDomList | FastjsDom,
  target: T,
  clone?: boolean
): InsertReturn;
```

Example:

```typescript
dom.select("#app").insert(dom.create("div"), "last")
```

It will return a `InsertReturn` object.

```typescript
type InsertReturn = {
  index: number;
  added: FastjsDom;
  origin: FastjsDom;
}
```

