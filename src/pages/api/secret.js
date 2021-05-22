import nc from "next-connect";
import { getSession } from "next-auth/client";
import { get_username } from "../../lib/next-auth-utils";
/*
 * handles server side protection by:
 * 1. rejecting access if not signed in
 * 2. rejecting access if not registred_dj
 */
const handler = nc().get(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const dj = await get_username(session.user.email);
      res.status(200).json(dj);
  }
  else {
    res.status(401); // not signed in, reject
  }
  res.end();
});

export default handler;
