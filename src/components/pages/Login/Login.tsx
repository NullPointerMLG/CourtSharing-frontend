import React, { useContext, useState } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import { UserContext } from "../../../context/UserContext";
import { Redirect } from "react-router-dom";
import { login } from "../../../services/API";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { isErrorMessage } from "../../../models/ErrorMessage";
import { Snackbar } from "@material-ui/core";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";

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

  const closeSnackBar = () => {
    setShowErrorMessage(NO_ERROR_MESSAGE);
  };

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        const user: firebase.User | null = firebase.auth().currentUser;
        if (user) {
          from(user.getIdToken())
            .pipe(switchMap((token: string) => login(token)))
            .subscribe(
              () => {
                setUser(user);
              },
              err => {
                firebase.auth().signOut();
                if (isErrorMessage(err)) setShowErrorMessage(err.message);
                else setShowErrorMessage(DEFAULT_ERROR_MSG);
              }
            );
        }
        return false;
      }
    }
  };

  if (user) return <Redirect to="/feed"></Redirect>;

  return (
    <div className="login-container">
      <Snackbar
        key={new Date().getTime() - 10}
        open={showErrorMessage.length > 0}
        autoHideDuration={ERROR_AUTO_HIDE_DURATION_MS}
        anchorOrigin={SNACKBAR_POSITION}
        onClose={closeSnackBar}
        message={showErrorMessage}
      />
      <h1>Login</h1>
      <StyledFirebaseAuth key={new Date().getTime()} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
