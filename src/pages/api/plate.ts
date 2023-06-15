import {NextApiRequest, NextApiResponse} from "next";
import {RouteHandler} from "@/services/route-handler";
import {PlateGetter, PlateModifier, PlateRemover} from "@/services/plates.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await RouteHandler(req, res, {
    GET: PlateGetter,
    POST: PlateModifier,
    DELETE: PlateRemover
  });
}