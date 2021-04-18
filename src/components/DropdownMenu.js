import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
//import styles from "../styles/DropdownMenu.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    
  },
  listItem: {
    "&:hover": {background: "#ddd",},
  }
  
}));

export default function DropdownMenu({ songs, fakeSearch, addSong }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
    fakeSearch();
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const addSongAndCloseMenu = (song) => {
    addSong(song);
    handleClickAway();
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <button type="button" onClick={handleClick}>
          Search
        </button>
        {open ? (
          <div className={classes.dropdown}>
            
              {songs.map( (song) =>
                <li
                    key={song.id}
                    onClick={() => addSongAndCloseMenu(song) } className={classes.listItem}>
                    {song.title},
                    {song.artist}
                </li>
              )}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}