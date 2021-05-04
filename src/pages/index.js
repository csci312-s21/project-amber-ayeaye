import {useState} from "react";

import Head from "next/head";

import styles from "../styles/Home.module.css";

import Playlist from "../components/Playlist";

import SearchBar from "../components/SearchBar";

import ManualEntry from "../components/ManualEntry";

// Minimal implementation
import ShowsSample from "../components/ShowsSample";

import sampleData from "../../data/songseed.json";

export default function Home() {

    const [currentSongs, setCurrentSongs] = useState(sampleData);
    const [addingMode, setAddingMode] = useState("search"); // other option is "manual"

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
        const newSongs = [...currentSongs, newSong];
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
            {addingMode==="search" ? <SearchBar addSong={addSong} switchMode={switchMode}/> :
            <ManualEntry addSong={addSong} switchMode={switchMode}/>}
            <Playlist songs={currentSongs} deleteSong={deleteSong} mode={"inPlaylist"}/>
            <ShowsSample/>
        </main>
    
        <footer>A CS 312 Project</footer>
        </div>
    );
}
