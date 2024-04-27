# Create a Instance

With a request that need to be sent multiple times and likely to have the same configuration, you can create a instance to reduce the configuration.

## Send Multiple Requests

:::tip Request Hooks
You should learned about request hooks before, if you haven't, please read [Request Hooks](./request-advanced.md).
:::

For example, we have a api for testing ping, because every time we need to send a request to the same url, we can create a instance to reduce the configuration.

```typescript
const pingApi = request
  .create("https://api.com/ping", null, {
    hooks: {
      init: (request) => {},
    },
  })
  .then((res) => {
    console.log(res.data);
  });

userApi
  .get()
  .then((res) => {
    // 200 Logged in
    console.log(res.data);
  })
  .catch((e: FailedParams) => {
    if (e.error === 403) {
      // 403 Unauthorized
      userApi.post({
        email,
        password,
      });
    }
  });
```

## Set Interface Config

You can set different base config for different instances, like some api need special headers to be sent.

```typescript
const userApi = request.create("https://reqres.in/api/users", {
  headers: {
    Authorization: "Bearer token",
  }
)

function getUserInfo() {
  return userApi.get(null, "https://reqres.in/api/users/getUserInfo");
}

function logout() {
  return userApi.post(null, "https://reqres.in/api/users/logout");
}
```

## Multi Callback

You can set multiple callback for a instance, and set the trigger of the callback.

```typescript
const userApi = request
  .create("https://reqres.in/api/users")
  .then(
    (data) => {
      if (!data.loggedIn) userApi.post();
    },
    true,
    "get",
  )
  .then(
    () => {
      location.href = "/login";
    },
    true,
    "post",
  )
  .then(console.log, true);

function getUserInfo() {
  return userApi.get();
}

function register() {
  return userApi.post();
}
```
