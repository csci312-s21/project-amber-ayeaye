// Playlist.js
// Visual component to present a playlist of Songs

import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Song from "./Song";
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Playlist({ songs, deleteSong }) {
  const classes = useStyles();
  const songComponents = songs.map((song) =>
    <Song song={song} deleteSong={deleteSong} />
  );

  return (
    <div className={classes.root}>
      <h2>
        Current Playlist:
      </h2>
      <List>
        {songComponents}
      </List>
    </div>
  );
}

Playlist.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

