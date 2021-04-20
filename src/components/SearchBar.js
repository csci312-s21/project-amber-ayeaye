import {useState, useEffect} from "react";
export default function SearchBar({callback}){
  const [track, setTrack] = useState("");
  const [artist, setArtist] = useState(""); 
  const [album, setAlbum] = useState("");
  const [song, setSong] = useState()  //object

  const apikey ="c3c30675cd237fa2a114de419139da9b";

  //const authenticate = `https://www.last.fm/api/auth/?api_key=${apikey}&cb=https://project-amber-ayeaye-1.ntare62.repl.co/`
  //const getToken =` http://ws.audioscrobbler.com/2.0/?method=auth.gettoken&api_key=${apikey}&format=json`


  const getAlbumcover = async () => {
    const getAlbum = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apikey}&artist=${artist}&album=${album}&format=json`
    const getData = async () =>{
      const response = await fetch(getAlbum);
      if(!response.ok){
        throw new Error (response.statusText);
      }
      const albumFromServer = await response.json();

      return albumFromServer.album.image[2]["#text"]
    }
    return await getData();
  }

  const searchTrack = async() => {
    const url= `https://ws.audioscrobbler.com/2.0/?method=track.search&artist=${artist}&track=${track}&limit=1&api_key=${apikey}&format=json`
    const artwork = await getAlbumcover();
    
    const getData = async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const songData = await response.json();
      setSong({title : songData.results.trackmatches.track[0].name, 
               artist: songData.results.trackmatches.track[0].artist, 
               artwork: artwork, 
               album: album, 
               id:songData.results.trackmatches.track[0].mbid })
    };
    
    getData();

  }
  

  useEffect(()=>{
    song && callback(song);
  }, [song])

    return(
      <div>
      <label>Song: 
      <input type="text" name="songTitle" id="title" placeholder="Song"value={track} onChange={((event)=>setTrack(event.target.value))}/>
      </label>
      <label>Artist: 
      <input type="text" name="artist" id="artist" placeholder="Artist" value={artist} onChange={((event)=>setArtist(event.target.value))}/>
      </label>
      <label>Album:
      <input type="text" name="album" id="album" placeholder="Album" value={album} onChange={((event)=>setAlbum(event.target.value))}/>
      </label>
      <button  onClick={() => searchTrack()}> search song</button> 
      </div>
    )
}