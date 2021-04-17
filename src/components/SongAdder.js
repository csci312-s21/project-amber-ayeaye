// SongAdder.js
// Component to let DJ search for a song and add it to a playlist

import PropTypes from "prop-types";
import DropdownMenu from "./DropdownMenu";


// todo for fakeSearch only
import sampleData from "../../data/songseed.json";

import { useState } from "react";

export default function SongEntryForm({ addSong }) {

  const [songTitle, setSongTitle] = useState("");
  const [songArtist, setSongArist] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const fakeSearch = () => {
    const results = sampleData.filter((song) => song.title[0] === "B");
    setSearchResults(results);
  };


  const titleInput =
    <div>
      <label>Title: </label>
      <input
        type="text"
        id="songTitle"
        placeholder="Enter a song title"
        value={songTitle}
        onChange={(event) => setSongTitle(event.target.value)}
      />
    </div>

  const artistInput =
    <div>
      <label>Artist: </label>
      <input
        type="text"
        id="songArtist"
        placeholder="Enter an artist name"
        value={songArtist}
        onChange={(event) => setSongArist(event.target.value)}
      />
    </div>

  return (
    <div>
      <h2>
        Song entry form:
            </h2>
      {titleInput}
      <br />
      {artistInput}
      <br />

      {(searchResults === []) ? <></> :
        <DropdownMenu songs={searchResults} fakeSearch={fakeSearch} addSong={addSong} />}
    </div>

  );
}

SongEntryForm.propTypes = {
  addSong: PropTypes.func.isRequired,
}; // todo

