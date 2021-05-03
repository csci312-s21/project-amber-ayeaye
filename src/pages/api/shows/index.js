import nc from "next-connect";
import { getShows } from "../../../lib/database-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .get(async (req, res) => {
        const shows = await getShows();
        res.status(200).json(shows);
    });

export default handler;