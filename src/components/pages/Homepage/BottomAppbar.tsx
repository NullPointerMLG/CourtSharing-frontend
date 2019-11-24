import React, { useContext } from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Sport } from "../../../models/Sport";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { FavouriteSportsContext } from "../../../context/SportsContext";

type HomePageAppBarProps = {
  selectedSports: Sport[];
};

const useStyles = makeStyles({
  bottomNavBar: {
    bottom: 0,
    top: "auto"
  },
  title: {
    fontSize: "20px",
    flexGrow: 1
  },
  nextButtonText: {
    fontSize: "15px",
    textAlign: "center",
    paddingRight: "5px"
  },
  nextIcon: {
    paddingRight: "5px"
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    marginLeft: "1rem"
  },
  nextButton: {
    marginLeft: "10px"
  }
});

export const BottomAppbar = (props: HomePageAppBarProps) => {
  const { selectedSports } = props;
  const [, setFavouriteSports] = useContext(FavouriteSportsContext)
  const classes = useStyles();

  return (
    <AppBar className={classes.bottomNavBar}>
      <Toolbar>
        <Typography className={classes.title} color="secondary">
          Select the sports you are interested in
        </Typography>
        {selectedSports.length > 0 && (
          <Link to="/feed" className={classes.link}>
            <Button color="secondary" className={classes.nextButton} onClick={setFavouriteSports(selectedSports)}>
              <Typography className={classes.nextButtonText}>Next</Typography>
              <NavigateNextIcon className={classes.nextIcon} />
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
