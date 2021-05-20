import nc from "next-connect";
import { addSong } from "../../../lib/song-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .put(async (req, res) => {
      const songToAdd = req.body;
      const newSong = await addSong(songToAdd);
      res.status(200).json(newSong);
    });
    
export default handler;