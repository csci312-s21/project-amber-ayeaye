import Playlist from "./Playlist";
import { useEffect, useState } from "react";

export default function CurrentPlaylist() {
  const [playlistSongs, setPlaylistSongs] = useState();
  const [currentPlaylistId, setCurrentPlaylistId] = useState();
  const [timePassed, setTimePassed] = useState(0);
  
  // fetch the id of the current playlist
  useEffect(() => {
    const getId = async () => {
      const response = await fetch("api/currentplaylist");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const id = await response.json();
      console.log(id)
      setCurrentPlaylistId(id);
    };
    getId();
  }, [timePassed]);
  
  // fetch current playlist songs
  useEffect(() => {
    const getPlaylistSongs = async () => {
      const response = await fetch(`api/playlistsongs/${currentPlaylistId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      currentPlaylistId && setPlaylistSongs(data);
    };
    currentPlaylistId && getPlaylistSongs();
  }, [currentPlaylistId, timePassed])

  // keep doing these fetches at a time interval
  setInterval(() => {
    console.log("time interval passed");
    setTimePassed(timePassed + 1)
  }, 10000)
  
  return currentPlaylistId && playlistSongs ? (
    <Playlist songs={playlistSongs} mode={"inListenerPlaylist"} />
    ) : (
      <div> no current playlist </div>
      );
    }
    