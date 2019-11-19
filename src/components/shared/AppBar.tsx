import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

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
  const [user, setUser] = useContext(UserContext);

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
            <ExitToAppSharpIcon className={classes.loginIcon} />
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
        {(user) ? renderLogoutButton() : renderLoginButton()}
      </Toolbar>
    </AppBar>
  );
};
