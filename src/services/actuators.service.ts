import {localUrl} from "@/utils/api-params";
import {NextApiRequest, NextApiResponse} from "next";

export interface Actuators {
    light: number,
    bar: number
}

export const ActorsGetter = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(`${localUrl}/api/actors`,{
    method: `GET`
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response;
  }).catch((e: Error) => {
    console.error("Could not fetch actors status. Reason: " + e.message);
  });
  if (response)
    return res.status(response.status).json(response.json());
  else
    return res.status(500);
}

export const ActorsSetter = async (req: NextApiRequest, res: NextApiResponse) => {
  const { actuators } = req.body;
  const response = await fetch(`${localUrl}/api/actors`,{
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(actuators)
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response;
  }).catch((e: Error) => {
    console.error("Could not fetch actors status. Reason: " + e.message);
  });
  if (response)
    return res.status(response.status).json(response.json());
  else
    return res.status(500);
}