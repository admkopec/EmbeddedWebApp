import {NextApiRequest, NextApiResponse} from "next";
import {RouteHandler} from "@/services/route-handler";
import {ActorsGetter, ActorsSetter} from "@/services/actuators.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await RouteHandler(req, res, {
    GET: ActorsGetter,
    POST: ActorsSetter
  });
}