import DjEntry from "../components/DjEntry";
import Head from "next/head";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Home.module.css";

import { Button } from "@material-ui/core";

export default function testDJ() {

    const useStyles = makeStyles(() => ({
        paper: {
          margin: 0,
          padding: "4px",
          maxWidth: 400,
        },
        entry: {
            maxWidth: 400
        }
    }));

    const classes = useStyles();

    return (
        <div className={styles.container}>
            <Head>
                <title>WRMC</title>
                <link rel="icon" href="/favicon.ico" />
                <img src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png" width="400"  alt="WRMC 91.1 FM Middlebury College Radio 91.1 FM"/>
            </Head>
            <main>
                <Button
                    variant="contained"
                    color="secondary"
                    href="/"
                >
                    Home Page
                </Button>

                <DjEntry/>
            </main>
            <footer>A CS 312 Project</footer>
        </div>
    );
}
