import Playlist from "./Playlist";
import { useEffect, useState } from "react";

export default function CurrentPlaylist() {
  const [playlistSongs, setPlaylistSongs] = useState();
  const [currentPlaylistId, setCurrentPlaylistId] = useState();

  useEffect(async () => {
    const getId = async () => {
      const response = await fetch("api/currentplaylist");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const id = await response.json();
      setCurrentPlaylistId(id);
    };
    await getId();

    if (currentPlaylistId) {
      console.log(currentPlaylistId);
    } else {
      console.log("no current playlist");
    }

    setInterval(() => {
      const getPlaylistSongs = async () => {
        const response = await fetch(`api/playlistsongs/${currentPlaylistId}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        currentPlaylistId && setPlaylistSongs(data);
      };
      if (currentPlaylistId) {
        getPlaylistSongs();
        console.log(playlistSongs);
      }
    }, 3000);
  }, []);

  return currentPlaylistId && playlistSongs ? (
    <Playlist songs={playlistSongs} mode={"inPlaylist"} />
  ) : (
    <div> no current playlist </div>
  );
}
