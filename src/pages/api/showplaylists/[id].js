import nc from "next-connect";
import { getShowPlaylists } from "../../../lib/database-utils";
import { onError } from "../../../lib/middleware";

const handler = nc( { onError })
    .get( async (req, res) => {
        const { id } = req.query;
        const showId = +id;
        const playlists = await getShowPlaylists(showId);
        res.status(200).json(playlists);
    });

export default handler;