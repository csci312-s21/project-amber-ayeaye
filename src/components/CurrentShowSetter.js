import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const ITEM_HEIGHT = 480;

export default function CurrentShowSetter({ setCurrentShow }) {
  const [showAnchor, setShowAnchor] = useState(null);
  const [show, setShow] = useState(null);
  const [shows, setShows] = useState([]);
  const showMenuIsOpen = Boolean(showAnchor);

  // Fetch shows from the sever
  useEffect(() => {
    const getShows = async () => {
      const response = await fetch("/api/shows");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const fetchedShows = await response.json();
      setShows(fetchedShows);
    };
    getShows();
  }, []);

  const handleShowClick = (event) => {
    setShowAnchor(event.currentTarget);
  };

  const showMenuClose = (selected) => {
    if (selected && selected.title) {
      setShow(selected);
      setCurrentShow(selected.id);
    }
    setShowAnchor(null);
  };

  const showItems = shows.map((showItem) => (
    <MenuItem key={showItem.id} onClick={() => showMenuClose(showItem)}>
      {showItem.title}
    </MenuItem>
  ));

  return (
    <div>
      <Button
        aria-controls="show-menu"
        aria-haspopup="true"
        onClick={handleShowClick}
      >
        {show ? show.title : "Click to Select a Show"}
      </Button>
      {show ? <div>Current Show Selected: {show.title}</div> : <></>}

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
    </div>
  );
}

CurrentShowSetter.propTypes = {
  setCurrentShow: PropTypes.func.isRequired,
};
