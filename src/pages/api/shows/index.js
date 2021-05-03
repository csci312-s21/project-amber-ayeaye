import nc from "next-connect";
import { getShows } from "../../../lib/show-table-utils";
import { onError } from "../../../lib/middleware";

const handler = nc({ onError })
    .get(astnc (req, res) => {
        const shows = await getShows();
        res.status(200).json(shows);
    });

export default handler;