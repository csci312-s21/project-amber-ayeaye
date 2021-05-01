import Playlist from "./Playlist";
import {config} from "../../config";
import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function SearchBar({addSong, switchMode}){
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [token, setToken] = useState("");

  const mySecret = process.env["CLIENT_SECRET"]
  console.log(mySecret)

  const addAndReset = (song) => {
    addSong(song);
    setSearchText("");
  }

  useEffect(() => {
    const authenticate = async () => {
    const BASE_URL = "https://accounts.spotify.com/api/token";
    
    //console.log(`Basic ${(new Buffer(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString("base64"))}`)
    //console.log(`Basic ${(new Buffer(`${process.env['CLIENT_ID']}:${process.env['CLIENT_SECRET']}`))}`)

    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
         "Authorization": `Basic ${(new Buffer(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString("base64"))}`
          // "Authorization": `Basic ${(new Buffer(`${process.env['CLIENT_ID']}:${process.env['CLIENT_SECRET']}`).toString("base64"))}`

      },
      body: new URLSearchParams({
        "grant_type": "client_credentials"
      }),

    });

    if (!response.ok) {
      throw new Error (response.statusText);
    }

    const auth = await response.json();

    setToken(auth);
  };

  authenticate();

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
    
    console.log(rawResults);

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
      
        <button  
          onClick={() => searchSong()} 
          disabled={searchText === ""}>
          Search
        </button> 

        {searchResults && <Playlist songs={searchResults} addSong={addAndReset} mode="inSearchResults" />}

      </div>
    )
  
}

SearchBar.propTypes = {
  addSong: PropTypes.func.isRequired,
  switchMode: PropTypes.func.isRequired,
};