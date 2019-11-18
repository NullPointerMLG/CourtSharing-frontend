import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';


const useStyles = makeStyles(theme => ({
  root: { padding: "200px 0", textAlign: "center" },
  buttonLabel: {
    textDecoration: "none",
    color: "white"
  }
}));

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
}

export const Landing: React.FC = props => { 
  const classes = useStyles();
  return (
    <React.Fragment>
    <div>
      <h1>CourtSharing</h1>
    </div>
    <div>
      <div className='login-container'>
        <h2>Login</h2>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </div>
    </div>
    </React.Fragment>
  )
}