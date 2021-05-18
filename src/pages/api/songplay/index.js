import nc from "next-connect";
import { getAllSongPlays } from "../../../lib/songPlay-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .get(async (req, res) => {
        const songPlays = await getAllSongPlays();
        res.status(200).json(songPlays);
    });

export default handler;