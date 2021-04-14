// Song.js
// Visual component for presenting a song in a playlist

import PropTypes from "prop-types";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Song({song, deleteSong}) {
    return (
        <div>
            <Avatar variant="square" alt="album artwork" src="/data/images/example_img.png"/>
            
            <h3>
                {song.title}
            </h3>
            <p>
                {song.artist}, {song.album}
            </p>
            <IconButton color="secondary" size="small" onClick={() => deleteSong(song)}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
}

Song.propTypes = {
  song:PropTypes.object.isRequired,
  deleteSong:PropTypes.func.isRequired,
};