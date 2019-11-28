import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../../context/UserContext";
import { Event } from "./Event";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FilterMenu } from "./FilterMenu";
import Grid from "@material-ui/core/Grid";
import { getEvents, getCourts } from "../../../services/API";
import { Event as EventObject } from "../../../models/Event";
import { EventParams } from "../../../models/EventParams";
import { GeoJsonObject } from "geojson";
import { CourtMap } from "../../shared/CourtMap";
import "./Feed.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "60px"
    },
    eventGridListContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      paddingLeft: "40px"
    },
    event: { marginBottom: "60px" },
    menuContainer: {
      marginLeft: "16px"
    }
  })
);

export const Feed: React.FC = () => {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  const [events, setEvents] = useState([] as EventObject[]);
  const [geoJson, setGeoJson] = useState<GeoJsonObject>();
  // TODO: handle error with a feedback component

  const handleFilterEvents = (params: EventParams) => {
    getEvents(params)
      .then(res => setEvents(res))
      .catch(e => console.warn(e));
  };

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res))
      .catch(e => console.warn(e));
    getCourts("5dd5cdae1c9d440000719592")
      .then(res => setGeoJson(res))
      .catch(e => console.warn(e));
  }, []);

  if (!user) return <Redirect to="/login" />;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <div className={classes.menuContainer}>
            <FilterMenu handleFilterEvents={handleFilterEvents} />
          </div>
        </Grid>
        <Grid item xs={9}>
          {geoJson && <CourtMap courts={geoJson}></CourtMap>}
          <div className={classes.eventGridListContainer}>
            <GridList
              cellHeight={500}
              className={classes.eventGridListContainer}
              cols={2}
            >
              {events.map((event, i) => (
                <GridListTile key={i} cols={1} className={classes.event}>
                  <Event event={event} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
