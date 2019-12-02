import React, { useContext, useState, useEffect } from "react";
import { SportsContext, SelectedSportContext } from "../../../context/SportsContext";
import { Sport } from "../../../models/Sport";
import {
  makeStyles,
  Theme,
  GridList,
  GridListTile,
  GridListTileBar
} from "@material-ui/core";
import { BottomAppbar } from "./BottomAppbar";
import { getSports } from "../../../services/API";
import ScaleLoader from "react-spinners/ScaleLoader";
import { UserContext } from "../../../context/UserContext";
import { Redirect } from "react-router-dom";

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: "5%",
    height: "100%",
    flexBasis: "10%"
  },
  gridlist: {
    justifyContent: "center",
    alignSelf: "center"
  },
  loadingSpinner: {
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  loadingSpinnerChild: {
    alignSelf: "center",
    justifyContent: "center"
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    opacity: "0.6"
  },
  sportImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain"
  }
}));

export const Homepage = () => {
  const [user] = useContext(UserContext);
  const [sports, setSports] = useContext(SportsContext);
  const [favouriteSport, setFavouriteSport] = useContext(SelectedSportContext);
  const [error, setError] = useState();

  const classes = useStyle();

  const clickSport = (sport: Sport): void => {
    if (favouriteSport === sport)
      setFavouriteSport(undefined);
    else {
      setFavouriteSport(sport);
    }
  };

  useEffect(() => {
    if (user) {
      getSports()
        .then((responseSports: Sport[]) => {
          setSports(responseSports);
        })
        .catch(err => {
          console.warn(err);
          setError(err.data);
        });
    }
  }, []);

  if (!user) return <Redirect to="/" />;

  return (
    <div className={classes.root}>
      {error && error.message && <p>{error.message}</p>}
      {!error && sports && sports.length === 0 && (
        <div className={classes.loadingSpinner}>
          <div className={classes.loadingSpinnerChild}>
            <ScaleLoader loading={true} color={"#1DA1F2"} />
          </div>
        </div>
      )}
      {!error && sports && sports.length > 0 && (
        <div>
          <GridList cols={8} className={classes.gridlist}>
            {sports.map((sport: Sport) => (
              <GridListTile
                onClick={() => {
                  clickSport(sport);
                }}
                key={sport.name}
                cols={1}
              >
                <img
                  src={sport.marker_url}
                  alt={sport.name}
                  className={classes.sportImage}
                />
                <GridListTileBar
                  title={sport.name}
                  className={
                    favouriteSport && (favouriteSport.name === sport.name) ? classes.selected : ``
                  }
                />
              </GridListTile>
            ))}
          </GridList>
          <BottomAppbar />
        </div>
      )}
    </div>
  );
};
