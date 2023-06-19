import {NextApiRequest, NextApiResponse} from "next";
import {localUrl} from "@/utils/api-params";

export interface Plate {
    plate: string;
    expireDate?: string;
}

export const PlateGetter = async (req: NextApiRequest, res: NextApiResponse) => {
  let responseJson;
  const {plateID} = req.query;
  const query = plateID ? (typeof plateID === "string" ? plateID : plateID.join(',')) : undefined;
  if (plateID && plateID != ''){
    console.log(query);
    responseJson = await fetch(`${localUrl}/api/plate/${query}`, {
      method: `GET`,
    }).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).catch((e: Error) => {
      console.error("Could not update plate. Reason: " + e.message);
    });
  }else{
    responseJson = await fetch(`${localUrl}/api/plate`, {
      method: `GET`
    }).then(response => {
      console.error("Fetch plates. Status: " + response.status);
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).catch((e: Error) => {
      console.error("Could not fetch plates. Reason: " + e.message);
    });
  }
  if (responseJson)
    return res.status(200).json(responseJson);
  else
    return res.status(500).json([]);
}

// Update + add plates function
export const PlateModifier = async (req: NextApiRequest, res: NextApiResponse) => {
  const {plate, newPlate} = JSON.parse(req.body);
  console.log(newPlate);
  const {plateID} = req.query;
  let query = plateID ? (typeof plateID === "string" ? plateID : plateID.join(',')) : undefined;
  let responseJson;
  if (plate && !query && !newPlate){
    responseJson = await fetch(`${localUrl}/api/plate`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify([ plate ])
    }).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).catch((e: Error) => {
      console.error("Could not add plate. Reason: " + e.message);
    });
  } else if (!plate && query && newPlate) {
    responseJson = await fetch(`${localUrl}/api/plate/${query}`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlate)
    }).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).catch((e: Error) => {
      console.error("Could not update plate. Reason: " + e.message);
    });
  }
  if (responseJson)
    return res.status(200).json(responseJson);
  else
    return res.status(500).json([]);
}

export const PlateRemover = async (req: NextApiRequest, res: NextApiResponse) => {
  const {plateID} = req.query
  let query = plateID ? (typeof plateID === "string" ? plateID : plateID.join(',')) : undefined;
  const response = await fetch(`${localUrl}/api/plate/${query}`, {
      method: `DELETE`
    }).then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response;
    }).catch((e: Error) => {
    console.error("Could not delete plate. Reason: " + e.message);
  });
  if (response)
    return res.status(response.status).json({});
  else
    return res.status(500).json({});
}