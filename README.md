# firebase-functions-router

Router controller pattern to use with firebase functions or anything else that needs a generic interface to express-like `req, res` expectations.

## Usage

Firebase https onRequest handler

```
export const HelloRouter = functions.https.onRequest(
  async (req, res): Promise<functions.Response> => {
    try {
      return await MyRouter(req, res);
    } catch (e) {
      console.error(e);
      return res.sendStatus(500);
    }
  },
);
```

and then you'd have a `HelloRouter` somewhere in your application like so:

```
const HelloRouter = async (req, res) => {
  return await Router({
    req,
    res,
    get: async (_, res) => {
      return await res.sendStatus(200);
    },
  });
};
```

Add as many method handlers as you want per http spec.

## Middleware

If you want to do something fancy between the request cycle and when the router instance responds, then you may want to use middleware.

The Router takes middleware options like so:

```
const AuthMiddleware = async router => {
  return {
    req: {
      ...router.req,
      auth: 'dan',
    },
    res: router.res,
  };
};

const FooMiddleware = async router => {
  return {
    req: {
      ...router.req,
      foo: 'bar',
    },
    res: router.res,
  };
};

const router = async (req, res) => {
  return await Router({
    req,
    res,
    middleware: [AuthMiddleware, FooMiddleware],
    get: async (req, res) => {
      if (req.auth === 'dan' && req.foo === 'bar')
        return await res.sendStatus(200);
    },
  });
};
```

More examples are in the spec files.

# Development

Written in TypeScript.

# Contributing

Just open a PR (with tests if it makes sense.)
