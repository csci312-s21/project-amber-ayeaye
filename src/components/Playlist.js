// Playlist.js
// Visual component to present a playlist of Songs

import PropTypes from "prop-types";
import Song from "./Song";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Playlist({ songs, deleteSong, addSong, mode }) {
  const classes = useStyles();

  const songComponents = songs.map((song) => (
    <Song
      key={song.id}
      song={song}
      deleteSong={deleteSong}
      addSong={addSong}
      mode={mode}
    />
  ));

  return (
    <div className={classes.root}>
      <h2>{mode === "inPlaylist" ? "Current Playlist" : "Search Results"}</h2>
      <List>{songComponents}</List>
    </div>
  );
}

Playlist.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteSong: PropTypes.func,
  addSong: PropTypes.func,
  mode: PropTypes.string.isRequired,
};
