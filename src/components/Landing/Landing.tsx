import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: { padding: "200px 0", textAlign: "center" },
  buttonLabel: {
    textDecoration: "none",
    color: "white"
  }
}));

export const Landing: React.FC = props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div>
        <h1>CourtSharing</h1>
      </div>
      <div>
        <div className="login-container">
          <h2>Landing page</h2>
          <Link className={classes.buttonLabel} to="/login">
            <Button variant="contained" color="primary">
              Log in
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
