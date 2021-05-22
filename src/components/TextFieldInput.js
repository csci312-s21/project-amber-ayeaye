import React from "react";

import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import MuiTextField from "@material-ui/core/TextField";
import clsx from "clsx";

const styles = {
  root: {
    margin: 8,
    width: "25ch",
  },
};

export const TextFieldInput = withStyles(styles)(MuiTextField);

const useStyles = makeStyles((theme) => ({
  textFieldInput: {
    margin: theme.spacing(4),
    minWidth: 250,
  },
}));

export const TextFieldInput2 = ({ className, ...other }) => {
  const classes = useStyles(other);
  return (
    <MuiTextField
      className={clsx(classes.textFieldInput, className)}
      {...other}
    />
  );
};
