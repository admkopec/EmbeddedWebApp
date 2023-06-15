import type { NextApiRequest, NextApiResponse } from "next";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type HttpHandler = (req: NextApiRequest, res: NextApiResponse) => void;

interface RouteHandlerParams {
  GET?: HttpHandler;
  POST?: HttpHandler;
  PUT?: HttpHandler;
  DELETE?: HttpHandler;
}

// Inspired by this source https://medium.com/@brandonlostboy/build-it-better-next-js-api-handler-75070dd1826f
export async function RouteHandler(
  request: NextApiRequest,
  response: NextApiResponse,
  handlers: RouteHandlerParams
) {
  const method = request.method as HttpMethod;
  const handler = handlers[method];

  if (!handler) {
    return response.status(405).send("Method not allowed");
  }

  return handler!(request, response);
}