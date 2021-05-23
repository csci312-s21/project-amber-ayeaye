import { useState } from "react";
import Playlist from "../components/Playlist";
import SearchBar from "../components/SearchBar";
import ManualEntry from "../components/ManualEntry";
import CurrentShowSetter from "../components/CurrentShowSetter";
import {
    Grid,
    Button,
    Container
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import LoginWidget from "../components/LoginWidget";
import { makeStyles } from "@material-ui/core/styles";

export default function DjEntry() {
    
    // Establish component states
    const [addingMode, setAddingMode] = useState("search");
    const [editingPlaylistId, setEditingPlaylistId] = useState();
    const [editingPlaylistSongs, setEditingPlaylistSongs] = useState();
    const [currentShowId, setCurrentShowId] = useState();
    const [songPlayOrder, setSongPlayOrder] = useState();
    const [lastCurrentPlaylistId, setLastCurrentPlaylistId] = useState();

    const useStyles = makeStyles(() => ({
      header: {
        padding: 20,
        backgroundColor: "#90d7ed",
        width: "100%",
      },
      body: {
        padding: 60,
      },
      logo: {
        margin: "auto",
      },
    }));

    const classes = useStyles();

    // Set the current show based on an ID
    const setCurrentShow = id => setCurrentShowId(id);

    // Switch between "search" mode and "manual" entry mode
    const switchMode = () => {
        if (addingMode === "search") {
          setAddingMode("manual");
        } else {
          setAddingMode("search");
        }
    }

    // Function to delete a song from the current playlist
    const deleteSongFromPlaylist = async (song) => {

        // Delete the song via the API
        const response1 = await fetch(
          `/api/songplay/${editingPlaylistId}`,
          {
            method: "DELETE",
            body: JSON.stringify(song),
            headers: new Headers({"Content-type":"application/json"}),
          }
        );
  
        if (!response1.ok) {
          throw new Error(response1.statusText);
        }
  
        // Fetch the updated version of the playlist
        const response2 = await fetch(
          `/api/playlistsongs/${editingPlaylistId}`,
          {
            method: "GET",
            headers: new Headers({"Content-type":"application/json"}),
          }
        );
  
        if (!response2.ok) {
          throw new Error(response2.statusText);
        }
  
        // Set the new playlist 
        const editedPlaylist = await response2.json();
        setEditingPlaylistSongs(editedPlaylist);
  
    }

    // Function to add a song to the current playlist
    const addSongToPlaylist = async (song) => {

        // Add the song to the database or get the ID if it already exists
        const response1 = await fetch(
            "/api/songs/",
            {
                method: "PUT",
                body: JSON.stringify(song),
                headers: new Headers({"Content-type":"application/json"}),
            }
        );
  
        if (!response1.ok) {
            throw new Error(response1.statusText);
        }
  
        const newSong = await response1.json();
  
        // Add the song play to the database
        const request2Body = [newSong, songPlayOrder];
        
        const response2 = await fetch(
            `/api/songplay/${editingPlaylistId}`,
            {
                method: "PUT",
                body: JSON.stringify(request2Body),
                headers: new Headers({"Content-type":"application/json"}),
            }
         );
  
        if (!response2.ok) {
            throw new Error(response2.statusText);
        } else {
            setSongPlayOrder(songPlayOrder + 1);
        }
  
        // Fetch the updated current playlist from the database 
        const response3 = await fetch(
            `/api/playlistsongs/${editingPlaylistId}`,
            {
                method: "GET",
                headers: new Headers({"Content-type":"application/json"}),
            }
        );
    
        if (!response3.ok) {
            throw new Error(response3.statusText);
        }
    
        // Set the new playlist 
        const editedPlaylist = await response3.json();
        setEditingPlaylistSongs(editedPlaylist);
  
    }

    // Function to create a new playlist for a show
    const createNewPlaylist = async (show_id) => {

      // we need to fetch the current playlist id and store it in state in case the new playlist is deleted 
        const response1 = await fetch(
          "/api/currentplaylist/",
          {
            method: "GET",
            headers: new Headers(
              {"Content-type":"application/json"}),
          }
        );

        if (!response1.ok) {
          throw new Error(response1.statusText);
        }

        const lastId = await response1.json();
        setLastCurrentPlaylistId(lastId);

        setSongPlayOrder(1);
    
        const response2 = await fetch(
            "/api/playlists/",
            {
                method: "PUT",
                body: JSON.stringify(show_id),
                headers: new Headers({"Content-type":"application/json"}),
            }
        );
    
        if (!response2.ok) {
          throw new Error(response2.statusText);
        }
    
        const newPlaylist = await response2.json();
        const newPlaylistId = newPlaylist.id;
    
        // Set the current playlist 
        const response3 = await fetch(
          `/api/currentplaylist/${newPlaylistId}`,
          {
            method: "PUT",
            headers: new Headers(
              {"Content-type":"application/json"}),
          }
        );
    
        if(!response3.ok){
          throw new Error(response3.statusText);
        }
    
        setEditingPlaylistId(newPlaylistId);
    
    }

    // Function to delete a playlist
    const deletePlaylist = async (id) => {

        const response1 = await fetch(
            "/api/playlists/",
            {
                method: "DELETE",
                body: JSON.stringify(id),
                headers: new Headers({"Content-type":"application/json"}),
            }
        );
  
        if (!response1.ok) {
            throw new Error(response1.statusText);
        }
  
        const deleted = await response1.json();

        const resetCurrentPlaylistId = async () => {

          const response2 = await fetch(`/api/currentplaylist/${lastCurrentPlaylistId}`,
            {
              method: "PUT",
              headers: new Headers(
                {"Content-type":"application/json"}),
            }
          );
    
          if(!response2.ok){
            throw new Error(response2.statusText);
          }

        }
  
        if(deleted) {
            setEditingPlaylistId();
            setEditingPlaylistSongs();
            resetCurrentPlaylistId();
        }
  
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>WRMC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={classes.header}>
        <Grid container justify="center">
          <img
            className="logo"
            src="https://wrmc.middlebury.edu/wp-content/themes/wrmc/images/logo_large.png"
            width="400"
            alt="WRMC 91.1 FM Middlebury College Radio 91.1 FM"
          />
        </Grid>
          <Link href="/">
            <Button
              variant="contained"
              color="secondary"
              style={{ position: "absolute", top: 20, right: 20 }}
            >
              Home
            </Button>
          </Link>
      </div>

      <main>
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={5}
          justify="center"
        >
          <div className={classes.body}>
            <Grid
              container
              direction="row"
              alignItems="flex-start"
              justify="center"
              spacing={4}
            >
              <Grid item>
                <CurrentShowSetter setCurrentShow={setCurrentShow}/>
              </Grid>
              <Grid item>
                { !editingPlaylistId ?
                  <Button
                      id="newPlaylistButton"
                      variant="contained"
                      color="primary"
                      size="medium"
                      disabled={!currentShowId}
                      startIcon={<AddIcon />}
                      onClick={() => createNewPlaylist(currentShowId)}
                  >
                      New Playlist
                  </Button>
                      :
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
                }
              </Grid>
              <Grid item>
                {editingPlaylistId && <Grid 
                  item xs={6}>
                  {addingMode==="search" ? 
                      <SearchBar addSongToPlaylist={addSongToPlaylist} switchMode={switchMode}/> :
                      <ManualEntry addSongToPlaylist={addSongToPlaylist} switchMode={switchMode}/>
                  }
                </Grid>}
              <Grid item>
                <CurrentPlaylist />
              </Grid>
            </Grid>
            </Grid>
          </div>
        </Grid>
      </main>
      <footer>A CS 312 Project</footer>
    </div>
  );

    // return (
    //     <Container>
    //         <Grid
    //             container
    //             spacing={6}
    //             direction="row"
    //         >
                
    //             <Grid item xs={6}>
    //                 <CurrentShowSetter setCurrentShow={setCurrentShow}/>
    //             </Grid>
        
    //             <Grid item xs={6}>
    //                 { !editingPlaylistId ?
    //                     <Button
    //                         id="newPlaylistButton"
    //                         variant="contained"
    //                         color="primary"
    //                         size="medium"
    //                         disabled={!currentShowId}
    //                         startIcon={<AddIcon />}
    //                         onClick={() => createNewPlaylist(currentShowId)}
    //                     >
    //                         New Playlist
    //                     </Button>
    //                         :
    //                     <Button
    //                         id="cancelButton"
    //                         variant="contained"
    //                         color="primary"
    //                         size="medium"
    //                         startIcon={<CancelIcon />}
    //                         onClick={() => deletePlaylist(editingPlaylistId)}
    //                         >
    //                         Cancel
    //                     </Button>
    //                 }
    //             </Grid>

    //         </Grid>

    //         <Grid
    //             container
    //             spacing={3}
    //         >

    //             {editingPlaylistId && <Grid 
    //                 item xs={6}>
    //                 {addingMode==="search" ? 
    //                     <SearchBar addSongToPlaylist={addSongToPlaylist} switchMode={switchMode}/> :
    //                     <ManualEntry addSongToPlaylist={addSongToPlaylist} switchMode={switchMode}/>
    //                 }
    //             </Grid>}

    //             <Grid item xs={6}>
    //                 {editingPlaylistSongs && <Playlist 
    //                     songs={editingPlaylistSongs} 
    //                     deleteSong={deleteSongFromPlaylist}
    //                     mode={"inPlaylist"}/>}
    //             </Grid>
            
    //         </Grid>
        
    //     </Container>

    // )

}
