import Playlist from "./Playlist";
import {config} from "../../config";

import {useState, useEffect} from "react";

import TextField from "@material-ui/core/TextField";

export default function SearchBar({addSong}){
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    const authenticate = async () => {
    const BASE_URL = "https://accounts.spotify.com/api/token";
    
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `Basic ${(new Buffer(`${config.CLIENT_ID}:${config.CLIENT_SECRET}`).toString("base64"))}`
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
        "Authorization": "Bearer " + token.access_token
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
          artwork: track.album.images[0],
          id: `${track.name}${track.artists[0].name}${track.album.name}`
        })
      )
    );
  }
  

 return(
      <div>

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

        {searchResults && <Playlist songs={searchResults} addSong={addSong} mode="inSearchResults" />}

      </div>
    )

    
}