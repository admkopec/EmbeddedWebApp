import {localUrl} from "@/utils/api-params";
import {NextApiRequest, NextApiResponse} from "next";

export interface ImageJson {
    imagedata: string
}

export const ImageGetter = async (req: NextApiRequest, res: NextApiResponse) => {
  const { imageID} = req.query;
  let query = imageID ? (typeof imageID === "string" ? imageID : imageID.join(',')) : undefined;
  console.log(query);
  let responseJson;
  if (query)
    responseJson = await fetch(`${localUrl}/api/image/${query}`, {
      method: `GET`
    }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }).catch((e: Error) => {
      console.error("Could not fetch log image. Reason: " + e.message);
    });
  else
    responseJson = await fetch(`${localUrl}/api/image`, {
      method: `GET`
    }).then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).catch((e: Error) => {
      console.error("Could not fetch current image. Reason: " + e.message);
    });
  if (responseJson)
    return res.status(200).json(responseJson);
  else
    return res.status(500);
}