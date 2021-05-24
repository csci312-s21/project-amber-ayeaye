import nc from "next-connect";
import { makeCurrentPlaylist } from "../../../lib/currentPlaylist-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError }).put(async (req, res) => {
  const { id } = req.query;
  const num_id = +id;
  const successful = await makeCurrentPlaylist(num_id);
  res.status(200).json(successful);
});

export default handler;
