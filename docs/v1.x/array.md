# Array

:::tip Strong FastjsArray
FastjsArray's type check can use without typescript, it also has a lot of useful methods. 
:::

FastjsArray is a strong type array.
It can let you find error in runtime.

## Create Array

Use `new FastjsArray()` to create a FastjsArray.

```javascript
import { FastjsArray } from 'fastjs-next';

const array = new FastjsArray();
```

## Type check

Give parameter `config.type` to allow type check.

```javascript
import { FastjsArray } from 'fastjs-next';

const array = new FastjsArray([], {
    type: ["string", "number"]
});
```

## Max length

Give parameter `config.length` to allow max length.

```javascript
import { FastjsArray } from 'fastjs-next';

const array = new FastjsArray([], {
    length: 10
});
```