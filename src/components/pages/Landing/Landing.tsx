import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Login } from "../Login/Login";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    textAlign: "center"
  },
  buttonLabel: {
    textDecoration: "none",
    color: "white"
  },
  landing: {
    width: "50%",
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },
  landingBg: {
    backgroundImage:
      "url('https://www.trzcacak.rs/myfile/full/331-3312030_royalty-free-halftone-pattern-abstract-geometric-royaltyfree-black.png')",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundSize: "200px 200px"
  },
  landingMessage: {
    backgroundColor: "rgba(29, 161, 242, 0.9)",
    borderRadius: "20px",
    padding: "20px",
  },
  landingHeader: {
    fontSize: "250%"
  },
  landingSubtitle: {
    fontSize: "110%"
  }
}));

export const Landing: React.FC = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.landing}>
        <div className={classes.landingBg}>
          <div className={classes.landingMessage}>
            <h1 className={classes.landingHeader}>CourtSharing</h1>
            <p className={classes.landingSubtitle}>Find sports and events.</p>
            <p className={classes.landingSubtitle}>Anywhere, anytime.</p>
          </div>
        </div>
      </div>
      <Login></Login>
    </div>
  );
};
