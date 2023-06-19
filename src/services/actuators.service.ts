import {localUrl} from "@/utils/api-params";
import {NextApiRequest, NextApiResponse} from "next";

export interface Actuators {
    light: number,
    bar: number
}

export const ActorsGetter = async (req: NextApiRequest, res: NextApiResponse) => {
  const responseJson = await fetch(`${localUrl}/api/actors`,{
    method: `GET`
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }).catch((e: Error) => {
    console.error("Could not fetch actors status. Reason: " + e.message);
  });
  console.log(responseJson);
  if (responseJson)
    return res.status(200).json(responseJson);
  else
    return res.status(500).json({});
}

export const ActorsSetter = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const responseJson = await fetch(`${localUrl}/api/actors`,{
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: req.body
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }).catch((e: Error) => {
    console.error("Could not fetch actors status. Reason: " + e.message);
  });
  console.log(responseJson);
  if (responseJson)
    return res.status(200).json(responseJson);
  else
    return res.status(500).json({});
}