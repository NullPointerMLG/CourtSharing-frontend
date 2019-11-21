import React, { useContext } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import { UserContext } from "../../../context/UserContext";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "100%",
    textAlign: "center"
  },
  signBox: {
    border: "0.5px solid black",
    width: "50%",
    padding: "25px 0px",
  }
}));

export const Login: React.FC = props => {
  const [user, setUser] = useContext(UserContext);
  const classes = useStyles();
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        const user = firebase.auth().currentUser;
        localStorage.setItem("loggedUser", JSON.stringify(user));
        setUser(user);
        return false;
      }
    }
  };

  if (user) return <Redirect to="/feed"></Redirect>;

  return (
    <div className={classes.root}>
      <Paper className={classes.signBox}>
        <h1>Sign In</h1>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Paper>
    </div>
  );
};
