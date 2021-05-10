import nc from "next-connect";
import { getPlaylists } from "../../../lib/database-utils";
import { createPlaylist } from "../../../lib/playlist-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .get(async (req, res) => {
        const playlists = await getPlaylists();
        res.status(200).json(playlists);
    })
    .put(async (req, res) => {
      const show_id = req.body;
      const newPlaylist = await createPlaylist(show_id);
      res.status(200).json(newPlaylist);
    });

export default handler;