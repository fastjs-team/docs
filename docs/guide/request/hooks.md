# Request Hooks

After reading this page, you will know how to add hooks to a global or instance scope.

## Lifecycle

There are 4 hooks in total, `before`, `init`, `success`, and `error`.

Hooks will be called in the following order:

### Handle Request

- `before` - Instance has been created, atom and configs are available.
- `init` - Request has been created, setting configs will not effect the request anymore.

### Handle Response

- `success` - Request has been sent and received a response.
- `failed` - Request has been sent but failed.

## Usage

Different hooks will receive different parameters.

### BeforeSend

`RequestHooks.BeforeSend` will receive his own request instance.

- `before`
- `init`

```typescript
type hook = (request: FastjsRequest) => boolean;
```

### RequestSuccess

`RequestHooks.RequestSuccess` will receive the [response object](#requestreturn).

- `success`

```typescript
type hook = (response: RequestReturn) => boolean;
```

### RequestFailed

`RequestHooks.RequestFailed` will receive the error and the request instance.

- `failed`

```typescript
type hook = (error: Error | number | null, request: FastjsRequest) => boolean;
```

When the error parameter is a `Error` object, it may be cause by hook interception, network error, and others.

When the error parameter is a `number`, it is the status code of the response.

:::advance

### Type Declaration

```typescript
export declare namespace RequestHooks {
  type BeforeSend = (request: FastjsRequest) => boolean;
  type RequestSuccess = (response: RequestReturn) => boolean;
  type RequestFailed = (error: any, request: FastjsRequest) => boolean;
}

export interface RequestHookParam {
  before?: RequestHooks.BeforeSend[] | RequestHooks.BeforeSend;
  init?: RequestHooks.BeforeSend[] | RequestHooks.BeforeSend;
  success?: RequestHooks.RequestSuccess[] | RequestHooks.RequestSuccess;
  failed?: RequestHooks.RequestFailed[] | RequestHooks.RequestFailed;
}
```

:::

## Set Hooks

You can set hooks in the global scope or instance scope.

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
let loading = false;
const getUserData = request
  .create("https://reqres.in/api/users", null, {
    hooks: {
      before: (request: FastjsRequest) => {
        if (loading) return false;
        loading = true;
        return true;
      },
    },
  })
  .then(() => {
    loading = false;
  });
```

### Multi Hooks <Badge text="v1.0.0-alpha.15"/>

:::warning Important Note
When you have instance and global hooks at the same time, the instance hooks will be called first.
:::

Set an array of hooks to run multiple hooks. Any hook that returns `false` will stop the request and will **not** run the next hooks.

```typescript
request.config.hooks.before = [
  () => {
    console.log("First hook");
    return false;
  },
  () => {
    console.log("Second hook"); // This will not be called
    return false;
  },
];
request.get("https://reqres.in/api/users");
// Log: First hook
```

If you still want to run the next hooks even if the previous hook returns `false`, you can set `GlobalConfig.hooks.runAll` to `true`.

```typescript
request.config.hooks.runAll = true;
request.config.hooks.before = [
  () => {
    console.log("First hook");
    return false;
  },
  () => {
    console.log("Second hook"); // This will be called
    return false;
  },
];
request.get("https://reqres.in/api/users");
// Log: First hook
// Log: Second hook
```

Also, multi hooks can be set in the instance scope.

```typescript
request.get("https://reqres.in/api/users", null, {
  hooks: {
    before: [() => {}, () => {}],
  },
});
```

## Example

Setting a hook to add a custom referer header.

```typescript
request.config.hooks.before = (request: FastjsRequest) => {
  request.config.headers["x-refer"] = location.href;
  return true;
};
```

Setting some hooks to handle the response.

```typescript
request.config.hooks.success = [
  () => {
    console.log("Request success");
    return true;
  },
  (response: RequestReturn) => {
    console.log("Response data", response.data);
    return true;
  },
];
```

## Type Declaration

### RequestReturn

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
