import styles from "../styles/Home.module.css";
import Head from "next/head";
import LoginWidget from "../components/LoginWidget";
import PlayButton from "../components/PlayButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import CurrentPlaylist from "../components/CurrentPlaylist";
import PlaylistExplorer from "../components/PlaylistExplorer";
import Schedule from "../components/Schedule";
import { useSession } from "next-auth/client";
import { Grid, Button } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  header: {
    padding: 20,
    backgroundColor: "#90d7ed",
    width: "100%",
  },
  body: {
    padding: 60,
  },
  logo: {
    margin: "auto",
  },
}));

export default function Home() {
  const classes = useStyles();

  const [showSecret, setShowSecret] = useState();
  const [session] = useSession();

  session && console.log(session.user.email);
  useEffect(() => {
    const getUser = async () => {
      if (session) {
        const response = await fetch("/api/secret");
        if (response.ok) {
          const username = await response.json();
          setShowSecret(username);
          console.log(username);
        } else {
          setShowSecret(null);
        }
      } else {
        setShowSecret(null);
      }
    };
    getUser();
  }, [session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>WRMC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.header}>
        <Grid container justify="center">
          <img
            className="logo"
            src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png"
            width="400"
            alt="WRMC 91.1 FM Middlebury College Radio 91.1 FM"
          />
        </Grid>
        {showSecret && (
          <Link href="/dj">
            <Button
              variant="contained"
              color="secondary"
              style={{ position: "absolute", top: 20, right: 20 }}
            >
              DJ Page
            </Button>
          </Link>
        )}
        <LoginWidget className={classes.login} />
      </div>

      <main>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={5}
          justify="center"
        >
          <div className={classes.body}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="center"
              spacing={4}
            >
              <Grid item>
                <PlayButton />
                <CurrentPlaylist />
              </Grid>
              <Grid item>
                <Schedule />
              </Grid>
              <Grid item>
                <PlaylistExplorer />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </main>
      <footer>A CS 312 Project</footer>
    </div>
  );
}
