# Getting Start with Request

## Advantages

- Better solution for Callback and Params giving
- Enhance your code Maintainability
- Connect with other modules easily
- Modular Design

## Import Module

```typescript
import { request } from "jsfast";
```

## Sending a request

Almost every project needs request sending, but we need to giving a lot of params to the request function, and the callback function is not easy to use.

But with `FastjsRequest`, you can do it easily.

```typescript
request.get("https://reqres.in/api/users").then((data) => {
  // {...}
  console.log(data);
});
```

Different from `axios`, you **don't need** to write `res.data` to get the data, it will return the data directly in first argument of the callback function.

For more information about the response, just use the second argument of the callback function.

```typescript
request
  .get("https://reqres.in/api/users")
  .then((data: any, res: RequestReturn) => {
    // 200
    console.log(res.status);
  });
```

### Type Declaration

```typescript
export interface RequestReturn {
  headers: Array<[string, string]>;
  headersObj: Record<string, string>;
  response: any;
  data: any;
  status: number;
  request: FastjsRequest;
  resend: () => FastjsRequest;
}
```

:::advance

### Learn More

When you send a request, fastjs will not return a `Promise` object directly, it only stores your handler and return the instance.

```typescript
const req: FastjsRequest = request.create("https://reqres.in/api/users");
req
  .get({ page: 1 })
  .get({ page: 2 })
  .then((data) => {
    // this will log 2 times, each time with 1 page data
    console.log(data);
  });
```

FastjsRequest works with custom promise, so it can pass 2 arguments to the callback function.

```typescript
request
  .get("https://reqres.in/api/users")
  .then((data: any, res: RequestReturn) => {
    console.log(data);
    console.log(res.status);
  });
```

:::

## Sending Data

You can send data with the second argument of the request function.

```typescript
request
  .post("https://reqres.in/api/login", {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  })
  .then((data) => {
    // {token: ...}
    console.log(data);
  });
```

### With Params

For get request, it will automatically add the params to the url when you pass the second argument.

```typescript
request
  // send a get request to https://reqres.in/api/users?page=1
  .get("https://reqres.in/api/users", { page: 1 });
```

For post request, it need to pass the data to the third argument, which is `RequestConfig`.

```typescript
request.post(
  "https://reqres.in/api/login",
  {
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  },
  {
    query: { page: 1 },
  },
);
```
