
import Head from "next/head";
import DjEntry from "../components/DjEntry";
import styles from "../styles/Home.module.css";
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
      <div className={styles.container}>
      <Head>
        <title>WRMC</title>
        <link rel="icon" href="/favicon.ico" />
        <img
          src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png"
          width="400"
          alt="WRMC 91.1 FM Middlebury College Radio 91.1 FM"
        />
      </Head>
      {!session && <Grid>
      <h3 color="red"><WarningIcon color="secondary"/> ACCESS DENIED</h3>
      <h3>Redirecting <CircularProgress color="secondary" /></h3>
      </Grid>}
      {session && <DjEntry />}
    </div>
    
)}

