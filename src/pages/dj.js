import DjEntry from "../components/DjEntry";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import WarningIcon from "@material-ui/icons/Warning";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useEffect } from "react";


export default function DJ() {
  const router = useRouter();
  const [session] = useSession();

  useEffect(()=>{
    if (!session){
      return router.push("/");
    }
  }, [session])
  
    return (
      <div>
        {session && <DjEntry />}
        {!session && <Grid>
        <h3 color="red"><WarningIcon color="secondary"/> ACCESS DENIED</h3>
        <h3>Redirecting <CircularProgress color="secondary" /></h3>
        </Grid>}
      </div>
    )
  
}

