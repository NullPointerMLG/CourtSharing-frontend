import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../../context/UserContext";
import { Event } from "./Event/Event";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FilterMenu } from "./FilterMenu";
import Grid from "@material-ui/core/Grid";
import { getEvents } from "../../../services/API";
import { EventParams } from "../../../models/EventParams";
import { CourtMap } from "../../Shared/CourtMap";
import "./Feed.css";
import { SelectedSportContext } from "../../../context/SportsContext";
import { Event as EventEntity } from "../../../models/Event";
import { EventDetails } from "./Event/EventDetails/EventDetails";

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
  const [favouriteSport] = useContext(SelectedSportContext);
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [eventSelected, setEventSelected] = useState<EventEntity>();

  // TODO: handle error with a feedback component

  const handleFilterEvents = (params: EventParams) => {
    console.log(params)
    getEvents(params)
      .then(res => setEvents(res))
      .catch(e => console.warn(e));
  };

  useEffect(() => {
    if (favouriteSport && user) {
      getEvents()
        .then(res => setEvents(res))
        .catch(e => console.warn(e));
    }
  }, []);

  if (!user) return <Redirect to="/login" />;
  if (!favouriteSport) return <Redirect to="/homepage" />;

  const onEventDetailsBack = () => {
    setEventSelected(undefined);
  };

  return (
    <div className={classes.root}>
      {!eventSelected ? (
        <Grid container>
          <Grid item xs={3}>
            <div className={classes.menuContainer}>
              <FilterMenu handleFilterEvents={handleFilterEvents} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <CourtMap></CourtMap>
            <div className={classes.eventGridListContainer}>
              <GridList
                cellHeight={500}
                className={classes.eventGridListContainer}
                cols={2}
              >
                {events.map((event, i) => (
                  <GridListTile key={i} cols={1} className={classes.event}>
                    <Event
                      event={event}
                      onClick={setEventSelected}
                      userUUID={user.uid}
                      setEvents={setEvents}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </Grid>
        </Grid>
      ) : (
        <EventDetails event={eventSelected} onBack={onEventDetailsBack} userUUID={user.uid}/>
      )}
    </div>
  );
};
