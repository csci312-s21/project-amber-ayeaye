import nc from "next-connect";
import { getPlaylists } from "../../../lib/database-utils";
import {
  createPlaylist,
  deletePlaylist,
} from "../../../lib/playlist-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.status(200).json(playlists);
  })
  .put(async (req, res) => {
    const show_id = req.body;
    const num_show_id = +show_id;
    const newPlaylist = await createPlaylist(num_show_id);
    res.status(200).json(newPlaylist);
  })
  .delete(async (req, res) => {
    const id = req.body;
    const num_id = +id;
    const deleted = await deletePlaylist(num_id);
    res.status(200).json(deleted);
  });

export default handler;
