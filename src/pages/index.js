
import styles from "../styles/Home.module.css";
import Head from "next/head";
import LoginWidget from "../components/LoginWidget";
import PlayButton from "../components/PlayButton";
import {useState, useEffect} from "react";
import Link from "next/link";
import PlaylistExplorer from "../components/PlaylistExplorer";
import Button from "@material-ui/core/Button";
import Schedule from "../components/Schedule";
import {useSession} from "next-auth/client";

export default function Home() {

const [showSecret, setShowSecret] = useState();
const [session] = useSession();

session && console.log(session.user.email)
  useEffect(()=>{
    const getUser = async ()=>{
      if (session){
        const response = await fetch("/api/secret");
        if (response.ok){

          const username = await response.json();
          setShowSecret(username);
          console.log(username)
        }
        else{
        setShowSecret(null);
        }
     }
     else{
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

            <img src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png" width="400"  alt="WRMC 91.1 FM Middlebury College Radio 91.1 FM"/>
        </Head>

        <main>

            <LoginWidget/>
            <Schedule/>
            <PlaylistExplorer/>

            {showSecret && <Link href="/dj">
              <Button
                variant="contained"
                color="secondary"

                >DJ Page
              </Button>
            </Link>}

            <Link href="/dj">
              <Button
                variant="contained"
                color="secondary"

                >DJ Page
              </Button>
            </Link>

            

        <PlayButton/>

        </main>
        <footer>A CS 312 Project</footer>
        </div>
    );
}
