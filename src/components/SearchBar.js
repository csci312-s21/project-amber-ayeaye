import Playlist from "./Playlist";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  entryField: {
    margin: "15px !important",
    width: "25ch !important",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SearchBar({ addSongToPlaylist, switchMode }) {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [token, setToken] = useState("");

  const addAndReset = (song) => {
    addSongToPlaylist(song);
    setSearchText("");
  };

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch("/api/spotifyauth");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const tokenData = await response.json();
      setToken(tokenData);
    };

    getToken();
  }, []);

  const searchSong = async () => {
    const url = `https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=10`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const rawResults = await response.json();

    setSearchResults(
      rawResults.tracks.items.map((track) => ({
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        artwork: track.album.images[0].url,
        spotify_id: track.id,
      }))
    );
  };

  return (
    <div>
      <Button
        id="switchButton"
        variant="outlined"
        size="medium"
        onClick={() => switchMode()}
      >
        Switch to Manual Entry
      </Button>

      <br />
      <br />

      <TextField
        id="keywordSearch"
        placeholder="Enter title, artist, and/or album"
        className={classes.entryField}
        required
        label="Keyword search"
        type="search"
        variant="filled"
        value={searchText}
        fullWidth
        onChange={(event) => setSearchText(event.target.value)}
      />

      <br />
      <br />

      <Button
        id="addButton"
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SearchIcon />}
        onClick={() => searchSong()}
        disabled={searchText === ""}
      >
        Search
      </Button>

      {searchResults && (
        <Playlist
          songs={searchResults}
          addSong={addAndReset}
          mode="inSearchResults"
        />
      )}
    </div>
  );
}

SearchBar.propTypes = {
  addSongToPlaylist: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
};
