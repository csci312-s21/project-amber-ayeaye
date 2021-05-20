import nc from "next-connect";
import { getCurrentPlaylistId } from "../../../lib/currentPlaylist-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .get(async (req, res) => {
        const currentPlaylistId = await getCurrentPlaylistId();
        res.status(200).json(currentPlaylistId);
    });

export default handler;