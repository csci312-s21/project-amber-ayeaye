import nc from "next-connect";
import { getPlaylists } from "../../../lib/database-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .get(async (req, res) => {
        const playlists = await getPlaylists();
        res.status(200).json(playlists);
    });

export default handler;