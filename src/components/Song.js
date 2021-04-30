// Song.js
// Visual component for presenting a song in a playlist
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from '@material-ui/icons/Add';
import AlbumIcon from "@material-ui/icons/Album";

export default function Song({song, deleteSong, addSong, mode}) {
    
    const image= "https://lastfm.freetls.fastly.net/i/u/174s/54b37d139a3e4656817f66e794492302.png"

    const defaultAvatar = <Avatar> <AlbumIcon /> </Avatar>;
    const customAvatar = <Avatar variant="square" alt="album artwork" src={image}/>;

    return (

        <div>
        {song.artwork ? customAvatar : defaultAvatar}
    
            <h3>
                {song.title}
            </h3>
            <p>
                {song.artist}, {song.album}
            </p>
            {mode==="inPlaylist" ? 
              <IconButton color="secondary" size="small" onClick={() => deleteSong(song)}>
              <DeleteIcon />
              </IconButton> : 
              <IconButton color="primary" size="small" onClick={() => addSong(song)}>
              <AddIcon />
              </IconButton>
            }
            
            
        </div>
    );
}

Song.propTypes = {
  song:PropTypes.object.isRequired,
  deleteSong:PropTypes.func,
  addSong:PropTypes.func,
  mode:PropTypes.string.isRequired,
};