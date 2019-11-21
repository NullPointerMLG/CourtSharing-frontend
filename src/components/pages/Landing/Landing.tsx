import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Login } from "../Login/Login";

const useStyles = makeStyles(theme => ({
  root: { 
    display: "flex", 
    justifyContent: "space-between",
    height: "100%",
    textAlign: "center" },
  buttonLabel: {
    textDecoration: "none",
    color: "white"
  },
  landing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    backgroundColor: "#1DA1F2",
    color: "white"
  },
  landingMessage: {

  }
}));

export const Landing: React.FC = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.landing}>
        <div className={classes.landingMessage}>
          <h1>CourtSharing</h1>
          <p>Find sports and events.</p>
          <p>Anywhere, anytime.</p>
        </div>
      </div>
      <Login></Login>
    </div>
  );
};
