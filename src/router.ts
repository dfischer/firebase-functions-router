export interface RouterRequest {
  method: string;
}

export type HttpStatus = number;

export interface RouterResponse {
  sendStatus: (HttpStatus) => HttpStatus;
}

export interface RouterRequestResponse {
  req: RouterRequest;
  res: RouterResponse;
}

export type RouterMiddleware = (
  router: RouterOptions,
) => Promise<RouterRequestResponse>;

export type RouterAction = (req, res) => Promise<RouterResponse>;

export interface RouterOptions {
  req: RouterRequest;
  res: RouterResponse;
  middleware?: RouterMiddleware[];
  post?: RouterAction;
  get?: RouterAction;
  head?: RouterAction;
  put?: RouterAction;
  delete?: RouterAction;
  connect?: RouterAction;
  options?: RouterAction;
  trace?: RouterAction;
  patch?: RouterAction;
}

export interface RouterActions {
  POST: RouterAction | undefined;
  GET: RouterAction | undefined;
  HEAD: RouterAction | undefined;
  PUT: RouterAction | undefined;
  DELETE: RouterAction | undefined;
  CONNECT: RouterAction | undefined;
  OPTIONS: RouterAction | undefined;
  TRACE: RouterAction | undefined;
  PATCH: RouterAction | undefined;
}

export const Router = async (
  router: RouterOptions,
): Promise<RouterResponse> => {
  let request = router.req;
  let response = router.res;

  if (router.middleware) {
    const middleware = await Promise.all(
      router.middleware.map(async middleware => await middleware(router)),
    );

    request = middleware.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ...currentValue.req,
      };
    }, router.req);

    response = middleware.reduce((accumulator, currentValue) => {
      return {
        ...accumulator,
        ...currentValue.res,
      };
    }, router.res);
  }

  const actions: RouterActions = {
    GET: router.get,
    POST: router.post,
    HEAD: router.head,
    PUT: router.put,
    DELETE: router.delete,
    CONNECT: router.connect,
    OPTIONS: router.options,
    TRACE: router.trace,
    PATCH: router.patch,
  };

  return (async () => await actions[router.req.method](request, response))();
};
