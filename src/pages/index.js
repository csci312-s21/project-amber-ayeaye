import {useState} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Playlist from "../components/Playlist";
import PlayButton from "../components/PlayButton";

import Grid from '@material-ui/core/Grid';
import RadioSchedule from "../components/RadioSchedule";


//import SongAdder from "../components/SongAdder";

//import SearchBar from "../components/SearchBar";

import ManualEntry from "../components/ManualEntry";

import sampleData from "../../data/songseed.json";

export default function Home() {

    const [currentSongs, setCurrentSongs] = useState(sampleData);
    const [addingMode, setAddingMode] = useState("search"); // other option is "manual"
    const [isPlaying, setIsPlaying] = useState(false);

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


          <Grid container spacing={3}>
            {/*<SongAdder addSong={addSong}/>*/}
            {/*<SearchBar callback={addSong}/>*/}
            {(true) ? <RadioSchedule/> : 
            <>
            <Grid item xs={12}justify="center" alignItems="center">
            <PlayButton isPlaying = {isPlaying} playOrPause = {playOrPause}/>
            </Grid>

            <Grid item xs={6}justify="center" alignItems="center">
              <ManualEntry addSong={addSong} switchMode={switchMode}/>
            </Grid>
            <Grid item xs={6}>
              <Playlist songs={currentSongs} deleteSong={deleteSong}/>
            </Grid>
            </>
            }
            
          </Grid>
        </main>
    
        <footer>A CS 312 Project</footer>
        </div>
    );
}
