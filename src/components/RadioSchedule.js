import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
//import icons to work with within the schedule
import ViewDayIcon from '@material-ui/icons/ViewDay';
import QueueMusic from '@material-ui/icons/QueueMusic';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: 'teal',

  },
}));

export default function NestedList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

//automated starter code to fill the schedule
const items= []
const sevenDaySchedule = items.map(item => 
  <li> 
    {item}
 </li>)

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
      
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ViewDayIcon />
        </ListItemIcon>
        <ListItemText primary= "Monday" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <QueueMusic />
            </ListItemIcon>

            <ListItemText primary="Chad's Show" /> {/* write in Title and timeslot */}
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


