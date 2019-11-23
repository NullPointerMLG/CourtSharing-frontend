import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import firebase from "firebase";

const navbarItems = [
  {name: "Courts", url: "/courts"},
  {name: "Feed", url: "/feed"},
  {name: "Profile", url: "/profile"},
]

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: "20px",
    flexGrow: 1
  },
  loginButtonText: {
    fontSize: "15px",
    textAlign: "center",
    paddingRight: "5px"
  },
  loginIcon: {
    paddingRight: "5px"
  },
  link: {
      textDecoration: "none",
      color: "inherit",
      marginLeft: "1rem"
  },
  appbar: {
    display: "absolute"
  },
  userButton: {
    marginLeft: "10px"
  }
}));

export const MainAppBar = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const links = navbarItems.map(link =>
    <Link to={link.url} key={link.name} className={classes.link}>{link.name}</Link>)
  const userLogOut = () => {
    const undefinedValue: any = undefined;
    firebase.auth().signOut();
    setUser(undefinedValue);
    localStorage.removeItem("loggedUser");
  };

  const renderLoginButton = () => {
    return (
      <Link to="/login" className={classes.link}>
        <Button color="secondary" className={classes.userButton}>
          <PersonSharpIcon className={classes.loginIcon} />
          <Typography className={classes.loginButtonText}>Log in</Typography>
        </Button>
      </Link>
    );
  };

  const renderLogoutButton = () => {
    return (
      <Link to="/" className={classes.link}>
        <Button color="secondary" onClick={userLogOut} className={classes.userButton}>
          <ExitToAppSharpIcon className={classes.loginIcon} />
          <Typography className={classes.loginButtonText}>Log out</Typography>
        </Button>
      </Link>
    );
  };

  return (
    (user) ? 
    <AppBar color="primary" position="sticky" >
      <Toolbar>
        <Typography className={classes.title} color="secondary">
          <Link to="/" className={classes.link}>CourtSharing</Link>
        </Typography>
        <div className={classes.appbar}>  
          {links}
        </div>
        {(user) ? renderLogoutButton() : renderLoginButton()}
      </Toolbar>
    </AppBar>
    : <React.Fragment></React.Fragment>
  );
};
