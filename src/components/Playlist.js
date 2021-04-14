// Playlist.js
// Visual component to present a playlist of Songs

import PropTypes from "prop-types";
import { useState } from "react";

import Song from "./Song";

export default function Playlist({songs, deleteSong}) {

    const songComponents = songs.map( (song) =>
        <li key={song.id}>
            <Song song={song} deleteSong={deleteSong}/>
        </li>
    );

    return (
        <div>
            <h2>
              Current Playlist:
            </h2>
            <ul>
                {songComponents}
            </ul>
        </div>
    );
}

Playlist.propTypes = {
  songs:PropTypes.arrayOf(PropTypes.object).isRequired,
};

