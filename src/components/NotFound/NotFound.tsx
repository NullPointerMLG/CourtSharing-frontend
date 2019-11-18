import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: { padding: "200px 0", textAlign: "center" },
  buttonLabel: {
    textDecoration: "none",
    color: "white"
  }
}));

export const NotFound: React.FC = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1>Ooops! You are lost!</h1>
      <Button variant="contained" color="primary">
        <Link className={classes.buttonLabel}  to="/">Back Home</Link>
      </Button>
    </div>
  );
};
