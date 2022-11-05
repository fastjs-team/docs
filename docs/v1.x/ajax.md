# Ajax

You can use FastjsAjax to create a ajax request.

## Create Ajax

:::warning Setup
You need to give a `url` to create a ajax request.
:::

```javascript
import {FastjsAjax} from 'fastjs-next';

const ajax = new FastjsAjax("https://fastjs.com.cn/");
```

## Send

:::tip Tips
Small or Big letter is not important when you use `send` .
:::

```javascript
import {FastjsAjax} from 'fastjs-next';

const ajax = new FastjsAjax("https://fastjs.com.cn/");
ajax.send("GET");
```

## Callback

Define callback and failed to get response when request is success or failed.

```javascript
import {FastjsAjax} from 'fastjs-next';

const ajax = new FastjsAjax("https://fastjs.com.cn/");
ajax.callback = result => {
  console.log(result);
}
ajax.failed = () => {
  console.log("failed");
}
ajax.send("GET");
```

## With Data

```javascript
import {FastjsAjax} from 'fastjs-next';

const ajax = new FastjsAjax("https://fastjs.com.cn/", {
  username: "fastjs"
})
ajax.send("POST");
```

## With Header

```javascript
import {FastjsAjax} from 'fastjs-next';

const ajax = new FastjsAjax("https://fastjs.com.cn/")
ajax.config.header = {
  "Content-Type": "application/json"
}
ajax.send("POST");
```

## Custom Timeout

```javascript
import {FastjsAjax} from 'fastjs-next';

const ajax = new FastjsAjax("https://fastjs.com.cn/")
ajax.config.header = {
  "Content-Type": "application/json"
}
ajax.config.timeout = 1000;
ajax.send("POST");
```

