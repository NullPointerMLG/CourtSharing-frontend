import React, { useContext } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import { UserContext } from "../../../context/UserContext.jsx";
import { Redirect } from "react-router-dom";


export const Login: React.FC = props => {

  const [user, setUser] = useContext(UserContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        setUser(firebase.auth().currentUser);
        return false;
      }
    }
  };
  
  if (user)
    return <Redirect to="/feed"></Redirect>

  return (
    <div className="login-container">
      <h1>Login</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
