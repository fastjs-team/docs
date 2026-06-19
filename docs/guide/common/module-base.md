# FastjsModuleBase

Every "instance" produced by Fastjs (`FastjsDom`, `FastjsDomList`, `FastjsDate`, `FastjsRequest`, `FastjsCookie`) is built by the same internal factory, so they all inherit a common surface called **`FastjsModuleBase`**.

It gives you:

- **Custom props** – attach business data directly on the instance.
- **Custom events** – attach named methods that receive the instance as their first argument.
- **`then`** – run a callback later (`setTimeout`-style) while keeping the chain.

> `FastjsRequest` is the only exception: it **does not** inherit `then` because `.then` on requests is overloaded to register success callbacks.

:::advance

#### Type Declaration

```typescript
interface FastjsModuleBase {
  [key: string]: any;

  setCustomProp(name: string, value: any): this;
  setCustomProps(props: { [key: string]: any }): this;
  getCustomProp(name: string): any;

  setCustomEvent(
    name: string,
    func: (module: this, ...args: any[]) => void,
    setup?: boolean,
  ): this;
  callCustomEvent(name: string, ...args: any[]): this;

  then(func: (e: this) => void, time?: number): this;
}
```

:::

## Custom props

### `setCustomProp(name, value)` / `setCustomProps(props)`

Attach arbitrary keys onto the instance.

```typescript
import { dom } from "jsfast";

const card = dom.newEl("div")
  .setCustomProp("itemId", 42)
  .setCustomProps({ rowId: 1, draft: true });

card.itemId;            // 42 (direct read works)
card.getCustomProp("itemId"); // 42 (semantic helper)
```

:::warning Reserved keys
Don't overwrite Fastjs internals such as `_el`, `_list`, `_events`, `_date`, `construct`, `data`, `config`, … Use names that won't collide with the instance's own API.
:::

### `getCustomProp(name)`

Read a key set via the helpers above. Equivalent to `instance[name]`; the helper is mostly there for readability.

## Custom events

### `setCustomEvent(name, func, setup = false)`

Attach a named **method** to the instance. The first argument of `func` is the instance itself, so you can keep chaining inside the body.

```typescript
import { date } from "jsfast";

const greeter = date.create();
greeter.setCustomEvent("hello", (self, who) => {
  console.log(`hello ${who} @ ${self.toString()}`);
});

greeter.hello("Alice");
```

`setup = true` calls the function once during registration, useful for initialisation:

```typescript
greeter.setCustomEvent("autoinit", (self) => self.refresh(), true);
```

### `callCustomEvent(name, ...args)`

Trigger a registered event explicitly. Equivalent to `instance[name](...)`, but returns the instance so it composes with other chain methods:

```typescript
greeter
  .callCustomEvent("hello", "Bob")
  .callCustomEvent("hello", "Carol");
```

## Delay with `then(func, time = 0)`

Run `func(this)`, optionally after `time` milliseconds. The method always returns the instance so the chain continues immediately.

```typescript
dom("#tip")
  .addClass("show")
  .then((el) => el.removeClass("show"), 1500); // hide after 1.5s
```

- `time = 0` → call synchronously (no `setTimeout` queued).
- `time > 0` → equivalent to `setTimeout(() => func(this), time)`.
- Development mode warns when `func` is not a function or `time` is not a number.

## Worked example: toast component

```typescript
import { dom } from "jsfast";

function makeToast(text: string, duration = 2000) {
  return dom.newEl("div", {
    text,
    class: ["toast"],
    css: {
      position: "fixed",
      bottom: "32px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "8px 16px",
      borderRadius: "8px",
      background: "#222",
      color: "white",
      opacity: "0",
      transition: "opacity .2s",
    },
  }).setCustomEvent("show", (self) => {
    self.push(document.body);
    self.then((el) => el.setStyle({ opacity: "1" }), 0);
    self.then((el) => {
      el.setStyle({ opacity: "0" });
      el.then((e) => e.remove(), 300);
    }, duration);
  }, true); // setup=true: trigger immediately
}

makeToast("Saved", 1500);
```

:::advance

## Extending instances with TypeScript

Because `FastjsModuleBase` is declared as `{ [key: string]: any }`, TypeScript will let you assign any property. You can opt into stricter types via [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) inside your own project:

```typescript
declare module "jsfast" {
  interface FastjsDomAtom<E> {
    rowId?: number;
    draft?: boolean;
  }
}

dom.newEl("div").setCustomProp("rowId", 1).rowId; // typed as number | undefined
```

> The `*Atom` interfaces are internal types; they're stable enough for declaration merging but please pin a version range if you depend on this in a library.

:::
