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
