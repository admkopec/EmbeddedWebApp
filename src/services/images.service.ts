import {localUrl} from "@/utils/api-params";
import {NextApiRequest, NextApiResponse} from "next";

export interface ImageJson {
    imagedata: string
}

export const ImageGetter = async (req: NextApiRequest, res: NextApiResponse) => {
  const { imageID} = req.query;
  let query = imageID ? (typeof imageID === "string" ? imageID : imageID.join(',')) : undefined;
  const responseJson = await fetch(`${localUrl}/api/image${query ? '/' + encodeURIComponent(query) : ''}`, {
    method: `GET`
  }).then((response) => {
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