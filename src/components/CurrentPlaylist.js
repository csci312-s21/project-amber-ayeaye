import Playlist from "./Playlist";
import { useEffect, useState } from "react";

export default function CurrentPlaylist() {
  const [playlistSongs, setPlaylistSongs] = useState();
  const [currentPlaylistId, setCurrentPlaylistId] = useState();

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

  }, []);

  setInterval(() => {
    const getPlaylistSongs = async () => {
      const response = await fetch(`api/playlistsongs/${currentPlaylistId}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      currentPlaylistId && setPlaylistSongs(data);
    };

    console.log('3 seconds');

    if (currentPlaylistId) {
      getPlaylistSongs();
    }
  }, 3000)


  return currentPlaylistId && playlistSongs ? (
    <Playlist songs={playlistSongs} mode={"inPlaylist"} />
  ) : (
    <div> no current playlist </div>
  );
}
