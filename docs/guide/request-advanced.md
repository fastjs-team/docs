# Scaling up with request



## Set Request Header

Set `config.headers` to pass headers to the request.

```typescript
request.get("https://reqres.in/api/users", null, {
  headers: {
    Authorization: "Bearer token",
  },
});
```

### Common Question

Q: Help! I try to send a request with `cookie`, but it doesn't work.

A: This is because the `cookie` is a **forbidden** header because of the **security policy of the browser**, you can't set it directly.

## Set Request Timeout

Set `config.timeout` to set the request timeout.

```typescript
request.get("https://looooooooong-time.request/", null, {
  timeout: 10000,
});
```

### Set Default Timeout

You can set the default timeout for all requests.

```typescript
request.config.timeout = 10000;
```

## Hooks

There are two scopes of hooks, `global` and `instance`.

### Global Hooks

Global hooks will effect all requests.

```typescript
request.config.hooks.before = (request: FastjsRequest) => {
  // Disallow all requests
  return false;
};
```

### Instance Hooks

Instance hooks will only effect the instance.

```typescript
const email = prompt("Email");
const password = prompt("Password");
request.post(
  "https://reqres.in/api/login",
  {
    email,
    password,
  },
  {
    hooks: {
      before: (request: FastjsRequest) => {
        if (!email || !password) {
          alert("Please enter email and password");
          return false;
        }
        return true;
      },
    },
  }
);
```

### Lifecycle

Every request has a lifecycle, you can use hooks to modify the request, intercept the request, or do something when the hook is triggered.

#### Before

At this stage, `Reqeust` is not created at this stage yet, so you can do modification to the request data.

For example, you can change the url of the request, or add some headers or data.

```typescript
request.config.hooks.before = (request: FastjsRequest) => {
  request.headers["Authorization"] = "Bearer token";
};
```

#### Init

At this stage, `Request` is created, but not sent yet.

You can do some modification to the request, or add some headers or data, **not changing the config of instance** like `url`, `data`, `config.headers`.

```typescript
request.config.hooks.init = (request: FastjsRequest) => {
  request.request.headers["Authorization"] = "Bearer token";
};
```

#### Success

:::tip Type Declaration
Check the [type declaration](./request-start.md#type-declaration) of `RequestReturn`.
:::

This hook only triggers when the request is successful.

```typescript
request.config.hooks.success = (response: RequestReturn) => {
  response.data.receivedAt = new Date().getTime();
};
```

#### Failed

:::tip Type Declaration
Check the [type declaration](./request-start.md#type-declaration) of `RequestReturn`.
:::

This hook only triggers when the request is failed.

```typescript
request.config.hooks.failed = (error: any, response: RequestReturn) => {
  console.error(error);
};
```

## Built-in Debounce

FastjsRequest has a built-in debounce function, you can use it to prevent sending requests too frequently.

```typescript
dom
  .newEl("button")
  .text("Click me")
  .addEvent("click", () => {
    request
      .get("https://reqres.in/api/users", null, {
        wait: 1000,
      })
      .then((data) => {
        console.log(data);
      });
  });
```
