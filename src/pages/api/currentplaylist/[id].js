import nc from "next-connect";
import { makeCurrentPlaylist } from "../../../lib/currentPlaylist-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .put(async (req, res) => {
      const { id } = req.query;
      const successful = await makeCurrentPlaylist(id);
      res.status(200).json(successful);
    });
    
export default handler;