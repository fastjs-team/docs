# Bind <Badge type="warning" text="v1.2.0">

## Create Bind

Use `FastjsDom.bind` to create a bind.

```javascript
import { selector as $ } from 'fastjs-next';

let obj = {
  time: 0,
};

obj = selector("body").bind("innerHTML", "time", obj);

setInterval(() => {
  obj.time++;
}, 1000);
```

## Update

```javascript
import { selector as $ } from 'fastjs-next';

let obj = {
  time: 0,
};

setInterval(() => {
  obj.time++;
  obj = selector("body").bind("innerHTML", "time", obj);
}, 1000);
```

## Remove

```javascript
import { selector as $ } from 'fastjs-next';

let obj = {
  time: 0,
};

obj = selector("body").bind("innerHTML", "time", obj);
obj = Object.assign({}, obj);
```