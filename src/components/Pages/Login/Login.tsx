import React, { useContext, useState } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import { UserContext } from "../../../context/UserContext";
import { Redirect } from "react-router-dom";
import { login } from "../../../services/api";
import { isErrorMessage } from "../../../models/ErrorMessage";
import { Snackbar } from "@material-ui/core";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import ScaleLoader from "react-spinners/ScaleLoader";
import { saveUserToLocalStorage } from "../../../utils/storage";

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
    boxShadow: "none",
    width: "50%"
  }
}));

interface User extends firebase.User {
  id: number;
}

export const Login: React.FC = props => {
  const NO_ERROR_MESSAGE: string = "";
  const ERROR_AUTO_HIDE_DURATION_MS: number = 6000;
  const SNACKBAR_POSITION: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "right"
  };
  const DEFAULT_ERROR_MSG = "Something wrong happened... Try again!";

  const [user, setUser] = useContext(UserContext);
  const [showErrorMessage, setShowErrorMessage] = useState(NO_ERROR_MESSAGE);
  const [isLoading, setIsLoading] = useState(false);

  const closeSnackBar = () => {
    setShowErrorMessage(NO_ERROR_MESSAGE);
  };

  const classes = useStyles();
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        const user: firebase.User | null = firebase.auth().currentUser;
        if (user) {
          setIsLoading(true);
          user.getIdToken().then((token: string) =>
            login(token)
              .then(id => {
                saveUserToLocalStorage(user);
                let userComplete: User = { ...user, id: id as number };
                setUser(userComplete);
              })
              .catch(err => {
                firebase.auth().signOut();
                if (isErrorMessage(err)) setShowErrorMessage(err.message);
                else setShowErrorMessage(DEFAULT_ERROR_MSG);
              })
              .finally(() => {
                setIsLoading(false);
              })
          );
        }
        return false;
      }
    }
  };

  if (user) return <Redirect to="/feed"></Redirect>;

  return (
    <div className={classes.root}>
      <Snackbar
        key={new Date().getTime() - 10}
        open={showErrorMessage.length > 0}
        autoHideDuration={ERROR_AUTO_HIDE_DURATION_MS}
        anchorOrigin={SNACKBAR_POSITION}
        onClose={closeSnackBar}
        message={showErrorMessage}
      />

      <Paper className={classes.signBox}>
        <h1>Login</h1>
        <ScaleLoader loading={isLoading} color={"#1DA1F2"} />
        {!isLoading && (
          <StyledFirebaseAuth
            key={new Date().getTime()}
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </Paper>
    </div>
  );
};
