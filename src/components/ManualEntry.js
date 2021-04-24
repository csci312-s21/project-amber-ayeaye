// ManualEntry.js
// form to let the DJ enter a song manually if it's not present in the Spotify API database

import PropTypes from "prop-types";
import { useState } from "react";

export default function ManualEntry({addSong, switchMode}) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");

  const addAndReset = (song) => {
    addSong(song);
    setTitle("");
    setArtist("");
    setAlbum("");
  }

  const titleInput =
  <div>
    <label>Title: </label>
    <input
      type="text"
      id="titleInput"
      placeholder="Enter a song title"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
    />
  </div>

  const artistInput =
    <div>
      <label>Artist: </label>
      <input
        type="text"
        id="artistInput"
        placeholder="Enter an artist name"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
      />
    </div>

    const albumInput =
      <div>
        <label>Album: </label>
        <input
          type="text"
          id="albumInput"
          placeholder="Enter an album name"
          value={album}
          onChange={(event) => setAlbum(event.target.value)}
        />
      </div>

    const addButton = 
      <div>
        <button
          id="addButton"
          onClick={() => addAndReset({title: title, artist: artist, album: album})}
          disabled={title === "" || artist === "" || album === ""}>
          Add
          </button>
      </div>

    const switchButton = 
      <div>
        <button
          id="switchButton"
          onClick={() => switchMode()}>
          Switch to Song Search
          </button>
      </div>

  return (
    <div>
      {switchButton}
      <h2>
        Enter a song manually:
      </h2>
      {titleInput}
      <br />
      {artistInput}
      <br />
      {albumInput}
      <br />
      {addButton}
    </div>
  );
}

ManualEntry.propTypes = {
  addSong: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
};