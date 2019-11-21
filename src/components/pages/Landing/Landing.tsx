import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Login } from "../Login/Login";

const useStyles = makeStyles(theme => ({
  root: { display: "flex", 
          justifyContent: "space-between",
          height: "100%",
          textAlign: "center" },
  buttonLabel: {
    textDecoration: "none",
    color: "white"
  },
  landing: {
    width: "50%",
    backgroundColor: "#1DA1F2",
    color: "white"
  }
}));

export const Landing: React.FC = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.landing}>
        <h1>CourtSharing</h1>
        <p>Find sports, anywhere, anytime.</p>
      </div>
      <Login></Login>
    </div>
  );
};
