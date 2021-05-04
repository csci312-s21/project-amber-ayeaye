// Song.js
// Visual component for presenting a song in a playlist
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import AlbumIcon from "@material-ui/icons/Album";
import {
  IconButton,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";

export default function Song({song, deleteSong, addSong, mode}) {

    const defaultAvatar = <Avatar> <AlbumIcon /> </Avatar>;
    const customAvatar = <Avatar variant="square" alt="album artwork" src={song.artwork}/>;

    const songInfo = `${song.artist  }, ${  song.album}`;

    return (
      <ListItem key={song.id}>
        <ListItemAvatar>
          {song.artwork ? customAvatar : defaultAvatar}
        </ListItemAvatar>
        <ListItemText primary={song.title} secondary={songInfo} />
        {mode==="inPlaylist" ? 
          <IconButton color="secondary" size="small" onClick={() => deleteSong(song)}>
          <DeleteIcon />
          </IconButton> : 
          <IconButton color="primary" size="small" onClick={() => addSong(song)}>
          <AddIcon />
          </IconButton>
        }
      </ListItem>
    );
}



Song.propTypes = {
  song:PropTypes.object.isRequired,
  deleteSong:PropTypes.func,
  addSong:PropTypes.func,
  mode:PropTypes.string.isRequired,
};