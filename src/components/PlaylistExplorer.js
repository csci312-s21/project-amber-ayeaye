import { useState, useEffect } from "react";
import { Menu, MenuItem, Button, List, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Song from "./Song";

const ITEM_HEIGHT = 48;

export default function PlaylistExplorer() {

    const [showAnchor, setShowAnchor] = useState(null);
    const [show, setShow] = useState(null);

    const [shows, setShows] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [dateAnchor, setDateAnchor] = useState(null);

    const showMenuIsOpen = Boolean(showAnchor);
    const dateMenuIsOpen = Boolean(dateAnchor);

    // Define the styles
    // Note: This is inside of the function to avoid refresh bug
    const useStyles = makeStyles((theme) => ({
        paper: {
            margin: 0,
            padding: "4px",
            maxWidth: 400,
            border: "1px solid black"
        }
    }));

    const classes = useStyles();

    // Fetch shows from the sever
    useEffect( () => {
        const getShows = async () => {
            const response = await fetch("/api/shows");
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            const fetchedShows = await response.json();
            setShows(fetchedShows);
        }
        getShows();
    }, []);

    // Fetch playlists corresponding to the selected show
    useEffect( () => {
        const getPlaylists = async () => {
            const response = await fetch(`/api/showplaylists/${show.id}`);
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            const fetchedPlaylists = await response.json();
            setPlaylists(fetchedPlaylists);
        }
        if(show) {
            getPlaylists();
        }
    }, [show]);

    // Fetch songs from selected playlist
    useEffect( () => {
        const getSongs = async () => {
            const response = await fetch(`/api/playlistsongs/${currentPlaylist.id}`);
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            const fetchedSongs = await response.json();
            setSongs(fetchedSongs);
        }
        if(currentPlaylist) {
            getSongs();
        }
    }, [currentPlaylist]);

    // Parse the Playlist object's date into a readable format:
    // MM-DD-YYYY
    const getDate = (playlist) => {
        const playlistCopy = {...playlist};
        const time = playlistCopy.time_window;
        const date = time.substring(
            time.lastIndexOf("D") + 1,
            time.lastIndexOf("T")
        );
        const month = date.substring(0, 2);
        const day = date.substring(2, 4);
        const year = date.substring(4, 8);
        const datePresentation = `${month}-${day}-${year}`;
        return datePresentation;
    }

    const handleShowClick = (event) => {
        setShowAnchor(event.currentTarget);
    };

    const handleDateClick = (event) => {
        setDateAnchor(event.currentTarget);
    };

    const showMenuClose = (selected) => {
        if (selected && selected.title) {
            setShow(selected);
            setSongs([]);
            setCurrentPlaylist(null);
            setPlaylists([]);

        }
        setShowAnchor(null);
    };
    
    const dateMenuClose = (selected) => {
        if (selected && selected.time_window) {
            setCurrentPlaylist(selected);
        }
        setDateAnchor(null);
    };
    
    const showItems = shows.map( (showItem) => 
        <MenuItem
            key={showItem.id}
            onClick={() => showMenuClose(showItem)}
        >
            {showItem.title}
        </MenuItem>
    );
    
    const dateItems = playlists.map( (playlist) => 
        <MenuItem
            key={playlist.id}
            onClick={() => dateMenuClose(playlist)}
        >
            {getDate(playlist)}
        </MenuItem>
    );

    let songComponents = [];
    if(songs) {
        songComponents = songs.map( (song) => 
            <Song key={song.id} song={song} mode={"inExplorer"} />
        );
    }

    return (
        <Paper className={classes.paper}>
            <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                width={400}
                justify="flex-start"
            >
    
                <Grid item xs={12} >
                    <h2>Playlist Explorer</h2>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        aria-controls="show-menu"
                        aria-haspopup="true"
                        onClick={handleShowClick}
                        variant="outlined"
                    >
                        {show ? show.title : "Click to Select a Show"}
                    </Button>
                    
                    <Menu
                        id="show-selector"
                        anchorEl={showAnchor}
                        keepMounted
                        open={showMenuIsOpen}
                        onClose={showMenuClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "40ch",
                            },
                        }}
                    >
                        {showItems} 
                    </Menu>
                </Grid>
            
                <Grid item xs={12}>
                    {(show) ?
                    <Button
                        aria-controls="show-menu"
                        aria-haspopup="true"
                        onClick={handleDateClick}
                        variant="outlined"
                    >
                        {(currentPlaylist) ? getDate(currentPlaylist) : "Click to choose date of show"}
                    </Button> : <></>}

                    <Menu
                        id="date-selector"
                        anchorEl={dateAnchor}
                        keepMounted
                        open={dateMenuIsOpen}
                        onClose={dateMenuClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: "40ch",
                            },
                        }}
                    >
                        {(dateItems.length !== 0) ? dateItems : "This show has no playlists."}
                    </Menu>
                </Grid>
        
                <Grid item xs={12}>
                    {(currentPlaylist !== null && currentPlaylist.length !== 0) ? 
                    <div>
                    <h3>Songs in the Playlist:</h3>
                    <List>
                        {(songComponents.length !== 0) ? songComponents : "This playlist is empty."}
                    </List>
                    </div> : <></>}
                </Grid>
                
            </Grid>
        </Paper>
    );

}