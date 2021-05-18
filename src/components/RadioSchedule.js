import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
//import icons to work with within the schedule
import ViewDayIcon from "@material-ui/icons/ViewDay";
import QueueMusic from "@material-ui/icons/QueueMusic";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 400,
  },
  header: {
    backgroundColor: "#42a5f5",
    "&:hover": {
      backgroundColor: "#81d4fa",
    },
    border: "1px solid rgb(212, 212, 212)",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: "#bbdefb",
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
  },
}));

export default function NestedList() {
  const classes = useStyles();

  const [openMonday, setOpenMonday] = React.useState(false);
  const handleClickMonday = () => {
    setOpenMonday(!openMonday);
  };

  const [openTuesday, setOpenTuesday] = React.useState(false);
  const handleClickTuesday = () => {
    setOpenTuesday(!openTuesday);
  };

  const [openWednesday, setOpenWednesday] = React.useState(false);
  const handleClickWednesday = () => {
    setOpenWednesday(!openWednesday);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Schedule for the Week
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem
        button
        onClick={handleClickMonday}
        className={classes.header}
        data-testid="mondaySection"
      >
        <ListItemIcon>
          <ViewDayIcon />
        </ListItemIcon>
        <ListItemText primary="Monday" />
        {openMonday ? (
          <ExpandLess data-testid="isExpanded" />
        ) : (
          <ExpandMore data-testid="isNotExpanded" />
        )}
      </ListItem>

      <Collapse in={openMonday} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>
            <ListItemText primary="Chad's Show" />{" "}
            {/* write in Title and timeslot */}
            <ListItemText secondary="8:00-9:00 pm" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>

            <ListItemText primary="That 70's Show" />
            {/* write in Title and timeslot */}
            <ListItemText secondary="9:00-10:00 pm" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={handleClickTuesday} className={classes.header}>
        <ListItemIcon>
          <ViewDayIcon />
        </ListItemIcon>
        <ListItemText primary="Tuesday" />
        {openTuesday ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openTuesday} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>
            <ListItemText primary="Chad's Show" />{" "}
            {/* write in Title and timeslot */}
            <ListItemText secondary="8:00-9:00 pm" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>

            <ListItemText primary="That 70's Show" />
            {/* write in Title and timeslot */}
            <ListItemText secondary="9:00-10:00 pm" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem
        button
        onClick={handleClickWednesday}
        className={classes.header}
      >
        <ListItemIcon>
          <ViewDayIcon />
        </ListItemIcon>
        <ListItemText primary="Wednesday" />
        {openWednesday ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openWednesday} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>
            <ListItemText primary="Chad's Show" />{" "}
            {/* write in Title and timeslot */}
            <ListItemText secondary="8:00-9:00 pm" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>

            <ListItemText primary="That 70's Show" />
            {/* write in Title and timeslot */}
            <ListItemText secondary="9:00-10:00 pm" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
