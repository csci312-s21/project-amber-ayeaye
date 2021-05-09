import nc from "next-connect";
import { getSongsFromPlaylist } from "../../../lib/database-utils";
import { onError } from "../../../lib/middleware";

const handler = nc( { onError })
    .get( async (req, res) => {
        const { id } = req.query;
        const playlistId = +id;
        const songs = await getSongsFromPlaylist(playlistId);
        res.status(200).json(songs);
    })

export default handler;