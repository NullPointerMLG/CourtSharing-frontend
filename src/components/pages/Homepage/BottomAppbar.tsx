import React, { useContext } from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import { Sport } from "../../../models/Sport";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { FavouriteSportContext } from "../../../context/SportsContext";

type HomePageAppBarProps = {
  selectedSport: Sport | undefined;
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
  const { selectedSport } = props;
  const [, setFavouriteSport] = useContext(FavouriteSportContext)
  const classes = useStyles();

  return (
    <AppBar className={classes.bottomNavBar}>
      <Toolbar>
        <Typography className={classes.title} color="secondary">
          Select the sport you are interested in
        </Typography>
        {selectedSport && (
          <Link to="/feed" className={classes.link}>
            <Button color="secondary" className={classes.nextButton} onClick={setFavouriteSport(selectedSport)}>
              <Typography className={classes.nextButtonText}>Next</Typography>
              <NavigateNextIcon className={classes.nextIcon} />
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
