import {ImageGetter} from "@/services/images.service";
import {NextApiRequest, NextApiResponse} from "next";
import {RouteHandler} from "@/services/route-handler";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await RouteHandler(req, res, {
    GET: ImageGetter
  });
}