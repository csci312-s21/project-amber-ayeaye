import { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Song from "./Song";


const ITEM_HEIGHT = 480;

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
            setCurrentPlaylist([]);
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
        <div>

            <Button aria-controls="show-menu" aria-haspopup="true" onClick={handleShowClick}>
                {show ? show.title : "Click to Select a Show"}
            </Button>
            {(show) ? <div>
                Current Show Selected: {show.title}
            </div>: <></>}
            
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
            >{showItems} 
            </Menu>

            {(show) ? <Button aria-controls="show-menu" aria-haspopup="true" onClick={handleDateClick}>
                {(currentPlaylist.length !== 0) ? getDate(currentPlaylist) : "Click to choose date of show"}
            </Button>: <></>}
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
            >{(dateItems.length !== 0) ? dateItems : "This show has no playlists."}
            </Menu>
            {(currentPlaylist !== null && currentPlaylist.length !== 0) ? 
            <div>
            <p>Songs in the Playlist:</p>
            <List>
                {(songComponents.length !== 0) ? songComponents : "This playlist is empty."}
            </List>
            </div> : <></>}
            

            
        </div>
    );

}