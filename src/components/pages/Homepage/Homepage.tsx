import React, { useContext, useState, useEffect } from "react";
import { SportsContext } from "../../../context/SportsContext";
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
    marginRight: "25%",
    marginLeft: "25%",
    height: "100%"
  },
  gridlist: {
    justifyContent: "center",
    alignSelf: "center",
    margin: "0px 0px 70px 0px !important"
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
    backgroundColor: "rgba(22, 140, 54, 0.6)"
  },
  sportImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain"
  }
}));

export const Homepage = () => {
  const emptyArray: any = [];
  const [user] = useContext(UserContext);
  const [sports, setSports] = useContext(SportsContext);
  const [selectedSports, setSelectedSports] = useState(emptyArray);
  const [error, setError] = useState();

  const classes = useStyle();

  const clickSport = (sport: Sport): void => {
    if (!selectedSports.includes(sport))
      setSelectedSports([...selectedSports, sport]);
    else {
      const newSports: Sport[] = selectedSports.filter(
        (auxSport: Sport) => auxSport.name !== sport.name
      );
      setSelectedSports(newSports);
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
      {sports && sports.length > 0 && (
        <div>
          <GridList cols={4} className={classes.gridlist}>
            {sports.map((sport: Sport) => (
              <GridListTile
                onClick={() => {
                  clickSport(sport);
                }}
                key={sport.name}
                cols={1}
              >
                <img
                  src={sport.icon_url}
                  alt={sport.name}
                  className={classes.sportImage}
                />
                <GridListTileBar
                  title={sport.name}
                  className={
                    selectedSports.includes(sport) ? classes.selected : ``
                  }
                />
              </GridListTile>
            ))}
          </GridList>
          <BottomAppbar selectedSports={selectedSports} />
        </div>
      )}
    </div>
  );
};
