import styles from "../styles/Home.module.css";
import Head from "next/head";
import LoginWidget from "../components/LoginWidget";
import SecureItems from "../components/SecureItems";
import PlayButton from "../components/PlayButton";
import {useState} from "react";
import Link from "next/link";
import PlaylistExplorer from "../components/PlaylistExplorer";
import Button from "@material-ui/core/Button";

export default function Home() {
const [user, setUser] = useState();
    return (
        <div className={styles.container}>
    
        <Head>
            <title>WRMC</title>
            <link rel="icon" href="/favicon.ico" />
     
            <img src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png" width="400"  alt="WRMC 91.1 FM Middlebury College Radio 91.1 FM"/>
        </Head>
    
        <main>
            <h1>

            Welcome to WRMC!
            </h1>
            <LoginWidget/>
            <SecureItems setUser={setUser}/>
            <PlaylistExplorer/>
            {(user) &&
          <Link href="/dj">
              <Button
                variant="contained"
                color="secondary"
                >DJ Page
              </Button>
          </Link>  
            }
        <PlayButton/>

        </main>
        <footer>A CS 312 Project</footer>
        </div>
    );
}