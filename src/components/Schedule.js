import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

// import MUI list components
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

// import icons to work with within the schedule
import ViewDayIcon from "@material-ui/icons/ViewDay";
import QueueMusic from "@material-ui/icons/QueueMusic";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: 400,
    maxWidth: 400,
  },
  header: {
    backgroundColor: "#42a5f5",
    "&:hover": {
      backgroundColor: "#90d7ed",
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

export default function Schedule() {
  const classes = useStyles();

  const [shows, setShows] = useState();
  const [daysCollapsed, setDaysCollapsed] = useState(Array(7).fill(true));

  const days = [
    { name: "Sunday", num: 0 },
    { name: "Monday", num: 1 },
    { name: "Tuesday", num: 2 },
    { name: "Wednesday", num: 3 },
    { name: "Thursday", num: 4 },
    { name: "Friday", num: 5 },
    { name: "Saturday", num: 6 },
  ];

  //get show data from server
  useEffect(() => {
    const getShows = async () => {
      const response = await fetch("/api/shows/");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const showResults = await response.json();
      setShows(showResults);
    };
    getShows();
  }, []);

  const changeDayCollapsed = (dayNum) => {
    const newDaysCollapsed = [...daysCollapsed];
    newDaysCollapsed[dayNum] = !newDaysCollapsed[dayNum];
    setDaysCollapsed(newDaysCollapsed);
  };

  // list of shows for a given day
  const showList = (dayNum) => {
    // we add 1 because days are 1-7 in database
    const showObjs =
      shows &&
      shows
        .filter((show) => show.schedule.charAt(1) === (dayNum + 1).toString())
        .sort(
          (a, b) =>
            parseInt(a.schedule.slice(3, 5)) - parseInt(b.schedule.slice(3, 5))
        );

    return showObjs.map((showObj) => (
      <List key={showObj.id} component="div" disablePadding>
        <ListItem className={classes.nested}>
          <ListItemIcon>
            <QueueMusic />
          </ListItemIcon>
          <ListItemText
            primary={`${showObj.title} - ${showObj.dj_name}`}
            secondary={`${showObj.schedule.slice(
              3,
              8
            )} - ${showObj.schedule.slice(9)}`}
          />
        </ListItem>
      </List>
    ));
  };

  // list of days of the week
  const dayList = days.map((day) => {
    const isCollapsed = daysCollapsed[day.num];

    return (
      <div key={day.num}>
        <ListItem
          button
          key={day}
          onClick={() => changeDayCollapsed(day.num)}
          className={classes.header}
        >
          <ListItemIcon>
            <ViewDayIcon />
          </ListItemIcon>
          <ListItemText primary={day.name} />
          {isCollapsed ? (
            <ExpandMore data-testid="isNotExpanded" />
          ) : (
            <ExpandLess data-testid="isExpanded" />
          )}
        </ListItem>

        <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
          {shows && showList(day.num)}
        </Collapse>
      </div>
    );
  });

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            disableSticky
            id="nested-list-subheader"
          >
            Schedule for the Week
          </ListSubheader>
        }
        className={classes.root}
      >
        {dayList}
      </List>
    </div>
  );
}
