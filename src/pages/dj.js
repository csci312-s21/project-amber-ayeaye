import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Playlist from "../components/Playlist";
import SearchBar from "../components/SearchBar";
import ManualEntry from "../components/ManualEntry";
import PlayButton from "../components/PlayButton";
import CurrentShowSetter from "../components/CurrentShowSetter";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import CircularProgress from '@material-ui/core/CircularProgress';
import WarningIcon from '@material-ui/icons/Warning';
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"

export default function DJ() {
  const [addingMode, setAddingMode] = useState("search"); // other option is "manual"
  const [editingPlaylistId, setEditingPlaylistId] = useState();
  const [editingPlaylistSongs, setEditingPlaylistSongs] = useState();
  const [currentShowId, setCurrentShowId] = useState();
  const [songPlayOrder, setSongPlayOrder] = useState();

  const router = useRouter();
  const [session] = useSession();

  useEffect(()=>{
    if (!session){
      return router.push("/");
    }
  }, [session])

  const setCurrentShow = (id) => setCurrentShowId(id);

  const switchMode = () => {
    if (addingMode === "search") {
      setAddingMode("manual");
    } else {
      setAddingMode("search");
    }
  };

  const deleteSongFromPlaylist = async (song) => {
    const response1 = await fetch(`/api/songplay/${editingPlaylistId}`, {
      method: "DELETE",
      body: JSON.stringify(song),
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response1.ok) {
      throw new Error(response1.statusText);
    }

    // get the new playlist
    const response2 = await fetch(`/api/playlistsongs/${editingPlaylistId}`, {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response2.ok) {
      throw new Error(response2.statusText);
    }

    // set the new playlist
    const editedPlaylist = await response2.json();
    // setEditingPlaylist(editedPlaylist);
    setEditingPlaylistSongs(editedPlaylist);
  };

  const addSongToPlaylist = async (song) => {
    // ideally, we would like to send the songPlayOrder as part of the request, but I can't figure out how to make that work

    // const requestBody = {
    //   song: song,
    //   songPlayOrder: songPlayOrder
    // };

    const response1 = await fetch("/api/songs/", {
      method: "PUT",
      body: JSON.stringify(song),
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response1.ok) {
      throw new Error(response1.statusText);
    }

    const newSong = await response1.json();

    const response2 = await fetch(`/api/songplay/${editingPlaylistId}`, {
      method: "PUT",
      body: JSON.stringify(newSong),
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response2.ok) {
      throw new Error(response2.statusText);
    } else {
      setSongPlayOrder(songPlayOrder + 1);
    }

    // get the new playlist
    const response3 = await fetch(`/api/playlistsongs/${editingPlaylistId}`, {
      method: "GET",
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response3.ok) {
      throw new Error(response3.statusText);
    }

    // set the new playlist
    const editedPlaylist = await response3.json();
    setEditingPlaylistSongs(editedPlaylist);
  };

  const createNewPlaylist = async (show_id) => {
    setSongPlayOrder(1);

    const response1 = await fetch("/api/playlists/", {
      method: "PUT",
      body: JSON.stringify(show_id),
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response1.ok) {
      throw new Error(response1.statusText);
    }

    const newPlaylist = await response1.json();
    const newPlaylistId = newPlaylist.id;

    // set the current playlist
    const response2 = await fetch(`/api/currentplaylist/${newPlaylistId}`, {
      method: "PUT",
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response2.ok) {
      throw new Error(response2.statusText);
    }

    setEditingPlaylistId(newPlaylistId);
  };

  const deletePlaylist = async (id) => {
    const response = await fetch("/api/playlists/", {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: new Headers({ "Content-type": "application/json" }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const deleted = await response.json();

    if (deleted) {
      setEditingPlaylistId();
      setEditingPlaylistSongs();
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>WRMC</title>
        <link rel="icon" href="/favicon.ico" />
        <img
          src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png"
          width="400"
          alt="WRMC 91.1 FM Middlebury College Radio 91.1 FM"
        />
      </Head>

      <main>
      {!session && 
      <Grid>
      <h3 color="red"><WarningIcon color="secondary"/> ACCESS DENIED</h3>
      <h3>Redirecting <CircularProgress color="secondary" /></h3>
      </Grid>}
      {session && <div>
        <h1>Welcome to WRMC!</h1>

        <Button variant="contained" color="secondary" href="/">
          Home Page
        </Button>

        <CurrentShowSetter setCurrentShow={setCurrentShow} />

        {!editingPlaylistId ? (
          <Button
            id="newPlaylistButton"
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<AddIcon />}
            onClick={() => createNewPlaylist(currentShowId)}
          >
            New Playlist
          </Button>
        ) : (
          <Button
            id="cancelButton"
            variant="contained"
            color="primary"
            size="medium"
            startIcon={<CancelIcon />}
            onClick={() => deletePlaylist(editingPlaylistId)}
          >
            Cancel
          </Button>
        )}

        <Grid container spacing={3}>
          <PlayButton/>

          {editingPlaylistId && (
            <Grid item xs={6}>
              {addingMode === "search" ? (
                <SearchBar
                  addSongToPlaylist={addSongToPlaylist}
                  switchMode={switchMode}
                />
              ) : (
                <ManualEntry
                  addSongToPlaylist={addSongToPlaylist}
                  switchMode={switchMode}
                />
              )}
            </Grid>
          )}

          <Grid item xs={6}>
            {editingPlaylistSongs && (
              <Playlist
                songs={editingPlaylistSongs}
                deleteSong={deleteSongFromPlaylist}
                mode={"inPlaylist"}
              />
            )}
          </Grid>
        </Grid>
        </div>}
      </main>

      <footer>A CS 312 Project</footer>
    </div>
  );
}
