# Selecter

:::tip Newest version
Fastjs-next `v1.2.0` is now available. [Click here](../other/changelog.html) to view the changelog.
:::

## Select element

:::warning selector <Badge text="v1.2.0" type="tip" />
Method `selector` is only available after `v1.2.0`. You should use `selecter` before `v1.2.0`.

Method `selecter` is also available after `v1.2.0`. But it will be removed in the future.
:::

:::tip
Use `selector as $name` to change the name of the selector.
:::

```typescript
const fastjs = {
    selector(
        el: string, place: HTMLElement | Document | FastjsDomList = _dev._dom // _dev._dom: document
    ): FastjsDom | FastjsDomList {}
}
```

```javascript
import { selector } from 'fastjs-next';

console.log(selector("body")); // FastjsDom
console.log(selector("html")); // FastjsDom
console.log(selector("head")); // FastjsDom
console.log(selector("div")); // FastjsDomList
```

### Select element by id

```javascript
import { selector as $ } from 'fastjs-next';

console.log($("#id")); // FastjsDom
```

### Select element by class

```javascript
import { selector as $ } from 'fastjs-next';

console.log($(".class")); // FastjsDomList
```

::: details FastjsDom and FastjsDomList
When will it return FastjsDom?

If you use id to select element, it will return `FastjsDom`.<br/>
Also, if your selector is selecting something in ./src/config.ts -> dom.specialDom: Array\<string\>, it will return `FastjsDom`.

dom.specialDom default value is `["html", "head", "body"]`.
:::

## Return

`selector` will return a `FastjsDom` or `FastjsDomList` object.