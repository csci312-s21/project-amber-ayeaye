// Song.js
// Visual component for presenting a song in a playlist
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import AlbumIcon from "@material-ui/icons/Album";
import { makeStyles } from '@material-ui/core/styles';

import {
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';


export default function Song({ song, deleteSong }) {

  const image = "https://lastfm.freetls.fastly.net/i/u/174s/54b37d139a3e4656817f66e794492302.png"

  const defaultAvatar = <Avatar> <AlbumIcon /> </Avatar>;
  const customAvatar = <Avatar variant="square" alt="album artwork" src={image} />;
  let songInfo = song.artist + ", " + song.album;
  return (
    <ListItem key={song.id}>
      <ListItemAvatar>
        <Avatar>
          {song.artwork ? customAvatar : defaultAvatar}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={song.title} secondary={songInfo} />
      <IconButton color="secondary" size="small" onClick={() => deleteSong(song)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

Song.propTypes = {
  song: PropTypes.object.isRequired,
  deleteSong: PropTypes.func.isRequired,
};