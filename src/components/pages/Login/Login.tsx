import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  signInSuccessUrl: "/feed",
  callbacks: {
    signInSuccessWithAuthResult: () => {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify(firebase.auth().currentUser)
      );
      return true;
    }
  }
};

export const Login: React.FC = props => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
