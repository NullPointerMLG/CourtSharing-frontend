import React, { useContext } from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { SelectedSportContext } from "../../../context/SportsContext";
import { saveSportToLocalStorage } from "../../../utils/storage";

const useStyles = makeStyles({
  bottomNavBar: {
    bottom: 0,
    top: "auto",
    minHeight: "45px"
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

export const BottomAppbar = () => {
  const [favouriteSport] = useContext(SelectedSportContext);
  const classes = useStyles();

  const handleNextClick = () => {
    saveSportToLocalStorage(favouriteSport);
  }

  return (
    <AppBar className={classes.bottomNavBar}>
      <Toolbar>
        <Typography className={classes.title} color="secondary">
          Select the sport you are interested in
        </Typography>
        {favouriteSport && (
          <Link to="/feed">
            <Button onClick={handleNextClick} color="secondary" className={classes.nextButton}>
              <Typography className={classes.nextButtonText}>Next</Typography>
              <NavigateNextIcon className={classes.nextIcon} />
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};
