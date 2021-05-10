import {useState} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Playlist from "../components/Playlist";
import SearchBar from "../components/SearchBar";
import ManualEntry from "../components/ManualEntry";
import PlayButton from "../components/PlayButton";
import sampleData from "../../data/songseed.json";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  entryField: {
    margin: "15px !important",
    width: "25ch !important",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function DJ() {

    const classes = useStyles();
    const [currentSongs, setCurrentSongs] = useState(sampleData);
    const [addingMode, setAddingMode] = useState("search"); // other option is "manual"
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState();

    const [currentShowId] = useState(7);

    const playOrPause = () => {
      if(isPlaying){
        setIsPlaying(false);
      } else{
        setIsPlaying(true);
      }
    }

    const switchMode = () => {
      if (addingMode === "search") {
        setAddingMode("manual");
      } else {
        setAddingMode("search");
      }
    }
    
    const deleteSong = (song) => {
        const newSongs = currentSongs.filter( (s) => s.id !== song.id);
        setCurrentSongs(newSongs);
    };

    const addSong = (newSong) => {
        const newSongs = [newSong, ...currentSongs];
        setCurrentSongs(newSongs);
    };

    const createNewPlaylist = async (show_id) => {

      const response = await fetch(
        "/api/playlists/",
        {
          method: "PUT",
          body: JSON.stringify(show_id),
          headers: new Headers({"Content-type":"application/json"}),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const newPlaylist = await response.json();

      setCurrentPlaylist(newPlaylist);

    }
    
    return (
        <div className={styles.container}>
    
        <Head>
            <title>WRMC</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <main>
            <h1>
            Welcome to WRMC!
            </h1>

            <Link href="/">
                <a>Home Page</a>
            </Link>

            {!currentPlaylist ? <Button
              id="newPlaylistButton"
              variant="contained"
              color="primary"
              size="medium"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={() => createNewPlaylist(currentShowId)}>
              New Playlist
            </Button> :
            <Button
              id="cancelButton"
              variant="contained"
              color="primary"
              size="medium"
              className={classes.button}
              startIcon={<CancelIcon />}
              onClick={() => setCurrentPlaylist()}>
              Cancel
            </Button>
            }

          <Grid container spacing={3}>

            <Grid 
              item xs={12}>
              <PlayButton 
                isPlaying = {isPlaying} 
                playOrPause = {playOrPause}/>
            </Grid>

            {currentPlaylist && <Grid 
              item xs={6}>
              {addingMode==="search" ? 
                <SearchBar addSong={addSong} switchMode={switchMode}/> :
                <ManualEntry addSong={addSong} switchMode={switchMode}/>
              }
            </Grid>}

            <Grid 
              item xs={6}>
              {currentPlaylist && <Playlist 
                songs={currentSongs} 
                deleteSong={deleteSong}
                mode={"inPlaylist"}/>}
            </Grid>

          </Grid>
          
        </main>
    
        <footer>A CS 312 Project</footer>
        </div>
    );
}
