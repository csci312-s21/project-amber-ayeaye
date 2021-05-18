import nc from "next-connect";
import { addSongToPlaylist, getSongsFromPlaylist, deleteSongFromPlaylist } from "../../../lib/database-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .put(async (req, res) => {
      const { id } = req.query;
      const playlistId = +id;
      const songToAdd = req.body;

      // *****ideally, we would like to send the songPlayOrder as part of the request, but I can't figure out how to make that work***

      // const body = req.body;
      // const songToAdd = body["song"];
      // const playOrder = body["songPlayOrder"];

      // the "1" parameter in addSongToPlaylist is a placeholder for songPlayOrder
      const newSongInPlaylist = await addSongToPlaylist(songToAdd, playlistId, 1);
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