import nc from "next-connect";
import { getSession } from "next-auth/client";
import {verify_dj} from "../../lib/next-auth-utils";
/*
* handles server side protection by:
* 1. rejecting access if not signed in
* 2. rejecting access if not registred_dj
*/
const handler = nc().get(async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    const registered_dj = await verify_dj(session.user.name); //checks whether signed in individual is a registered as dj
    if(registered_dj){
      res.status(200).json({dj: registered_dj});
    }
    else{
      res.status(401)
    }   
} else {
  res.status(401); // not signed in, reject
}
res.end();
});

export default handler;

