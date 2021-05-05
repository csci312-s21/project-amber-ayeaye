import nc from "next-connect";
import { authenticate } from "../../../lib/spotify-auth-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
  .get(async (req, res) => {
    const token = await authenticate();
    res.status(200).json(token);
  });

export default handler;
