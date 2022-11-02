# Selecter

## Select element

:::tip
Use `selecter as $name` to change the name of the selecter.
:::

```javascript
import { selecter } from 'fastjs-next';

console.log(selecter("body")); // FastjsDom
```

### Select element by id

```javascript
import { selecter as $ } from 'fastjs-next';

console.log($("#id")); // FastjsDom
```

### Select element by class

```javascript
import { selecter as $ } from 'fastjs-next';

console.log($(".class")); // FastjsDomList
```

