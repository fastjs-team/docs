# Create a Instance

With a request that need to be sent multiple times and likely to have the same configuration, you can create a instance to reduce the configuration.

## Send Multiple Requests

For example, we have a user api, that allows us to get user info with a `GET` request, and login with a `POST` request.

```typescript
const userApi = request.create("https://reqres.in/api/users");

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
