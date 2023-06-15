import {NextApiRequest, NextApiResponse} from "next";
import {RouteHandler} from "@/services/route-handler";
import {LogsGetter} from "@/services/logs.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await RouteHandler(req, res, {
    GET: LogsGetter
  });
}