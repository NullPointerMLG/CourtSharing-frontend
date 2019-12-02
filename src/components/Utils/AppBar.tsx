import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Theme,
  Chip,
  Avatar,
  Popper
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import firebase from "firebase";
import classNames from "classnames";

const navbarItems = [
  { name: "Courts", url: "/courts" },
  { name: "Feed", url: "/feed" },
  { name: "Profile", url: "/profile" }
];

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: "20px",
    flexGrow: 1
  },
  loginButtonText: {
    fontSize: "15px",
    textAlign: "right",
    paddingRight: "5px",
    color: "#000000"
  },
  loginIcon: {
    paddingRight: "5px",
    color: "#000000"
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  appbar: {
    display: "absolute"
  },
  userButton: {
    marginLeft: "20px",
    cursor: "pointer"
  },
  userPopper: {
    zIndex: 999999,
    backgroundColor: "#e0e0e0",
    left: "-7px !important",
    borderRadius: "15px 0px 15px 15px",
    boxShadow: "11px 10px 18px -7px rgba(0,0,0,0.75)"
  },
  noBottomRound: {
    borderRadius: "15px 15px 0px 0px !important"
  },
  columnFlex: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 0 10px 0",
  }
}));

export const MainAppBar = () => {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const showPopper: boolean = Boolean(anchorEl);

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const userLogOut = () => {
    const undefinedValue: any = undefined;
    setAnchorEl(null);
    firebase.auth().signOut();
    setUser(undefinedValue);
    localStorage.removeItem("loggedUser");
  };

  const renderLoginButton = () => {
    return (
      <Link to="/" className={classes.link}>
        <Button color="secondary" className={classes.userButton}>
          <PersonSharpIcon className={classes.loginIcon} />
          <Typography className={classes.loginButtonText}>Log in</Typography>
        </Button>
      </Link>
    );
  };

  const renderLogoutButton = () => {
    return (
      <div>
        <Chip
          onClick={handleUserClick}
          className={classNames({
            [classes.userButton]: true,
            [classes.noBottomRound]: showPopper
          })}
          avatar={<Avatar src={user.photoURL} alt={user.displayName} />}
          label={user.displayName}
        />
        <Popper
          anchorEl={anchorEl}
          open={showPopper}
          className={classes.userPopper}
        >
          <div className={classes.columnFlex}>
            <Link to="/homepage" className={classes.link}>
              <Button color="secondary" className={classes.userButton}>
                <FavoriteIcon className={classes.loginIcon} />
                <Typography className={classes.loginButtonText}>
                  Favourite Sport
                </Typography>
              </Button>
            </Link>
            <Link to="/" className={classes.link}>
              <Button
                color="secondary"
                onClick={userLogOut}
                className={classes.userButton}
              >
                <ExitToAppIcon className={classes.loginIcon} />
                <Typography className={classes.loginButtonText}>
                  Log out
                </Typography>
              </Button>
            </Link>
          </div>
        </Popper>
      </div>
    );
  };

  return user ? (
    <AppBar color="primary" position="sticky">
      <Toolbar>
        <Typography className={classes.title} color="secondary">
          <Link to="/" className={classes.link}>
            CourtSharing
          </Link>
        </Typography>
        {user ? renderLogoutButton() : renderLoginButton()}
      </Toolbar>
    </AppBar>
  ) : (
    <React.Fragment></React.Fragment>
  );
};
