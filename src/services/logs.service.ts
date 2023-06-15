import {NextApiRequest, NextApiResponse} from "next";
import {localUrl} from "@/utils/api-params";

export interface Log {
    timestamp: string; // id of the log
    action: string;
    description: string;
    image?: string;
}

export const LogsGetter = async (req: NextApiRequest, res: NextApiResponse) => {
  const responseJson = await fetch(`${localUrl}/api/logs`, {
    method: `GET`
  }).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }).catch((e: Error) => {
    console.error("Could not fetch image. Reason: " + e.message);
  });
  if (responseJson)
    return res.status(200).json(responseJson);
  else
    return res.status(500);
}