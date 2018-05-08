import { Router } from './router';
import { expect } from 'chai';
import 'mocha';

// from caller
const response = {
  sendStatus: status => status,
};

describe('Creating a Router Controller', () => {
  it('should return 200 with a GET', async () => {
    const request = {
      method: 'GET',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        get: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a POST', async () => {
    const request = {
      method: 'POST',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        post: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a HEAD', async () => {
    const request = {
      method: 'HEAD',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        head: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a PUT', async () => {
    const request = {
      method: 'PUT',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        put: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a DELETE', async () => {
    const request = {
      method: 'DELETE',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        delete: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a CONNECT', async () => {
    const request = {
      method: 'CONNECT',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        connect: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a OPTIONS', async () => {
    const request = {
      method: 'OPTIONS',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        options: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a TRACE', async () => {
    const request = {
      method: 'TRACE',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        trace: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a PATCH', async () => {
    const request = {
      method: 'PATCH',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        patch: async (_, res) => {
          return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a GET based on body properties', async () => {
    const request = {
      method: 'GET',
      body: 'hello',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        get: async (req, res) => {
          if (req.body === 'hello') {
            return await res.sendStatus(200);
          }
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a GET based on middleware auth', async () => {
    const request = {
      method: 'GET',
      body: 'hello',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        get: async (req, res) => {
          if (req.body === 'hello') return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });
});

describe('Creating a Middleware', () => {
  it('should return 200 with a GET middleware for auth', async () => {
    const AuthMiddleware = async router => {
      return {
        req: {
          ...router.req,
          auth: 'dan',
        },
        res: router.res,
      };
    };
    const request = {
      method: 'GET',
    };

    const router = async (req, res) => {
      return await Router({
        req,
        res,
        middleware: [AuthMiddleware],
        get: async (req, res) => {
          if (req.auth === 'dan') return await res.sendStatus(200);
        },
      });
    };

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });

  it('should return 200 with a GET middleware for muliple auth layers', async () => {
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

    const request = {
      method: 'GET',
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

    const fakeHandler = await router(request, response);
    expect(fakeHandler).to.equal(200);
  });
});
