// ManualEntry.js
// form to let the DJ enter a song manually if it's not present in the Spotify API database

import PropTypes from "prop-types";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  entryField: {
    margin: '15px !important',
    width: '25ch !important',
  },
  button: {
    margin: theme.spacing(1),
  },
}));


export default function ManualEntry({ addSong, switchMode }) {
  const classes = useStyles();
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
    <TextField
      margin="2"
      className={classes.entryField}
      required id="titleInput" label="Song title" type="search" variant="filled"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
    />

  const artistInput =
    <TextField
      className={classes.entryField}
      required id="artistInput" label="Artist name" type="search" variant="filled"
      value={artist}
      onChange={(event) => setArtist(event.target.value)}
    />

  const albumInput =
    <TextField
      className={classes.entryField}
      required id="albumInput" label="Album title" type="search" variant="filled"
      value={album}
      onChange={(event) => setAlbum(event.target.value)}
    />

  const addButton =
    <Button
      id="addButton"
      variant="contained"
      color="primary"
      size="small"
      className={classes.button}
      startIcon={<SaveIcon />}
      onClick={() => addAndReset({ title: title, artist: artist, album: album })}
      disabled={title === "" || artist === "" || album === ""}
    >
      Save
      </Button>


  const switchButton =
    <Button
      variant="contained"
      id="switchButton"
      size="small"
      className={classes.button}
      onClick={() => switchMode()}>
      Switch to Song Search</Button>

  return (
    <Grid>

      <h2>
        Enter a song manually:
      </h2>
      <form className={classes.root} noValidate autoComplete="off">
        {titleInput}
        {artistInput}
        {albumInput}
        {addButton}{switchButton}
      </form>
      </Grid>
  );
}

ManualEntry.propTypes = {
  addSong: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
};