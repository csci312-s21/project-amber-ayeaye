// ManualEntry.js
// form to let the DJ enter a song manually if it's not present in the Spotify API database

import PropTypes from "prop-types";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    <TextField
      id="titleInput"
      placeholder="Enter a song title"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
    />
  </div>

  const artistInput =
    <div>
      <label>Artist: </label>
      <TextField
        id="artistInput"
        placeholder="Enter an artist name"
        value={artist}
        onChange={(event) => setArtist(event.target.value)}
      />
    </div>

    const albumInput =
      <div>
        <label>Album: </label>
        <TextField
          id="albumInput"
          placeholder="Enter an album name"
          value={album}
          onChange={(event) => setAlbum(event.target.value)}
        />
      </div>

    const addButton = 
      <div>
        <Button
          id="addButton"
          variant="contained"
          size="small"
          onClick={() => addAndReset({title: title, artist: artist, album: album, id: `${title}${artist}${album}`})}
          disabled={title === "" || artist === "" || album === ""}>
          Add
          </Button>
      </div>

    const switchButton = 
      <div>
        <Button
          id="switchButton"
          variant="outlined"
          size="small"
          onClick={() => switchMode()}>
          Switch to Song Search
          </Button>
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