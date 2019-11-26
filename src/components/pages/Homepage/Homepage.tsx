import React, { useContext, useState } from "react";
import { SportsContext } from "../../../context/SportsContext";
import { Sport } from "../../../models/Sport";
import {
  makeStyles,
  Theme,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import { BottomAppbar } from "./BottomAppbar";

const useStyle = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    marginRight: "25%",
    marginLeft: "25%"
  },
  gridlist: {
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 0px 70px 0px !important"
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
  const [sports] = useContext(SportsContext);
  const [selectedSports, setSelectedSports] = useState(emptyArray);

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

  console.log(selectedSports);

  return (
    <div className={classes.root}>
      <GridList cols={4} className={classes.gridlist}>
        {sports.length > 0 &&
          sports.map((sport: Sport) => (
            <GridListTile
              onClick={() => {
                clickSport(sport);
              }}
              key={sport.name}
              cols={1}
            >
              <img src={sport.icon_url} alt={sport.name} className={classes.sportImage}/>
              <GridListTileBar title={sport.name} className={selectedSports.includes(sport) ? classes.selected : ``}/>
            </GridListTile>
          ))}
      </GridList>
      <BottomAppbar selectedSports={selectedSports}/>
    </div>
  );
};
