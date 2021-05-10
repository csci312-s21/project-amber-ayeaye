
// import {useState} from "react";
// import Head from "next/head";
// import styles from "../styles/Home.module.css";
// import Playlist from "../components/Playlist";
// import SearchBar from "../components/SearchBar";
// import ManualEntry from "../components/ManualEntry";
// import PlayButton from "../components/PlayButton";
// import sampleData from "../../data/songseed.json";
// import Grid from "@material-ui/core/Grid";

import LoginWidget from "../components/LoginWidget";


// // Minimal implementation

// import ShowsSample from "../components/ShowsSample";
import Link from "next/link";
import PlaylistExplorer from "../components/PlaylistExplorer";

export default function Home() {
    return (     

        <div>
            <Link href="/dj">
                <a>DJ Page</a>
            </Link>
            <LoginWidget/>
            <PlaylistExplorer/>
        </div>
    )
}