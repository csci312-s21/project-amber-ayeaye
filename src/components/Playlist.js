// Playlist.js
// Visual component to present a playlist of Songs

import PropTypes from "prop-types";

import Song from "./Song";

export default function Playlist({songs, deleteSong, addSong, mode}) {

    const songComponents = songs.map( (song) =>
        <li key={song.id}>
            <Song song={song} deleteSong={deleteSong} addSong={addSong} mode={mode}/>
        </li>
    );

    return (
        <div>
            <h2>
              {mode==="inPlaylist" ? 
                "Current Playlist" : "Search Results"}
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

