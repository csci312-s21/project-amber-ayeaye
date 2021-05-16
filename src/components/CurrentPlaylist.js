import Playlist from "./Playlist";
import { useEffect, useState } from "react";

export default function CurrentPlaylist({ playlistId }) {
  const [playlistSongs, setPlaylistSongs] = useState();

  useEffect(() => {
    setInterval(() => {
      const getPlaylistSongs = async () => {
        const response = await fetch(`api/playlistsongs/${playlistId}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setPlaylistSongs(data);
      };
      getPlaylistSongs();
    }, 3000);
  }, []);
  return <Playlist songs={playlistSongs} mode={"inPlaylist"} />;
}
