import React from "react";
import { AppBar, Toolbar, Typography, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontFamily: "Roboto",
    fontSize: "20px",
    flexGrow: 1
  },
  loginButtonText: {
    fontFamily: "Roboto",
    fontSize: "15px",
    textAlign: "center",
    paddingRight: "5px"
  },
  loginIcon: {
    paddingRight: "5px"
  },
  link: {
      textDecoration: "none",
      color: "inherit"
  }
}));

export const MainAppBar = () => {
  const classes = useStyles();
  const loggedUser: string | null = localStorage.getItem("loggedUser");

  const renderLoginButton = () => {
    return <Link to="/login">
          <Button color="secondary">
            <PersonSharpIcon className={classes.loginIcon} />
            <Typography className={classes.loginButtonText}>Log in</Typography>
          </Button>
        </Link>
  }

  const renderLogoutButton = () => {
    return <Link to="/logout">
          <Button color="secondary">
            <Typography className={classes.loginButtonText}>Log out</Typography>
          </Button>
        </Link>
  }

  return (
    <AppBar color="primary">
      <Toolbar>
        <Typography className={classes.title} color="secondary">
          <Link to="/" className={classes.link}>Court-Sharing</Link>
        </Typography>
        {(loggedUser === null) ? renderLogoutButton() : renderLoginButton()}
      </Toolbar>
    </AppBar>
  );
};
