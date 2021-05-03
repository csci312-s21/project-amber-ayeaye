import Playlist from "./Playlist";
import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function SearchBar({addSong, switchMode}) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [token, setToken] = useState("");

  const addAndReset = (song) => {
    addSong(song);
    setSearchText("");
  }

  useEffect(() => {
    const getToken = async () => {
      const response = await fetch("/api/auth");
      if(!response.ok){
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
        "Authorization": `Bearer ${token.access_token}`
      }
    });
    if(!response.ok){
      throw new Error(response.statusText);
    }

    const rawResults = await response.json();

    setSearchResults(
      rawResults.tracks.items.map((track) =>
        ({
          title: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          artwork: track.album.images[0].url,
          id: `${track.name}${track.artists[0].name}${track.album.name}`
        })
      )
    );
  }

  return(
      <div>

        <Button
        id="switchButton"
        variant="outlined"
        size="small"
        onClick={() => switchMode()}>
        Switch to Manual Entry
        </Button>

        <br /><br />

        <label>Keyword Search: 
        <TextField 
          name="keywordSearch" 
          id="keywordSearch" 
          placeholder="Enter song name, artist, and/or album" 
          value={searchText} 
          onChange={((event)=>setSearchText(event.target.value))}/>
        </label>

        <Button
          id="addButton"
          variant="contained"
          size="small"
          onClick={() => searchSong()} 
          disabled={searchText === ""}>
          Search
        </Button>

        {searchResults && <Playlist songs={searchResults} addSong={addAndReset} mode="inSearchResults" />}

      </div>
    )
  
}

SearchBar.propTypes = {
  addSong: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
};