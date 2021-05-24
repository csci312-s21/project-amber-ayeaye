import nc from "next-connect";
import {
  addSongToPlaylist,
  getSongsFromPlaylist,
  deleteSongFromPlaylist,
} from "../../../lib/database-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .put(async (req, res) => {
      const { id } = req.query;
      const playlistId = +id;

      const {body} = req;
      const songToAdd = body[0];
      const playOrder = body[1];

      const newSongInPlaylist = await addSongToPlaylist(songToAdd, playlistId, playOrder);
      res.status(200).json(newSongInPlaylist);
    })
    .delete(async (req, res) => {
      const { id } = req.query;
      const song = req.body;
      const songId = song.id;
      const songsInPlaylist = await getSongsFromPlaylist(id);
      const songInPlaylist = songsInPlaylist.filter(s => s.id===songId);
      const {songplay_id} = songInPlaylist[0];
      const deleted = await deleteSongFromPlaylist(songplay_id);
      res.status(200).json(deleted);
    });

export default handler;
