import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../../context/UserContext";
import { Event } from "./Event/Event";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FilterMenu } from "./FilterMenu";
import Grid from "@material-ui/core/Grid";
import { getEvents } from "../../../services/api";
import { EventParams } from "../../../models/EventParams";
import { CourtMap } from "../../Utils/CourtMap";
import { SelectedSportContext } from "../../../context/SportsContext";
import { Event as EventEntity } from "../../../models/Event";
import { EventDetails } from "./Event/EventDetails/EventDetails";
import ScaleLoader from "react-spinners/ScaleLoader";

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
    event: { marginBottom: "60px", height: "auto !important" },
    menuContainer: {
      marginLeft: "16px"
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
    }
  })
);

export const Feed: React.FC = () => {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  const [selectedSport] = useContext(SelectedSportContext);
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [eventSelected, setEventSelected] = useState<EventEntity>();
  // TODO: handle error with a feedback component

  const handleFilterEvents = (params: EventParams) => {
    getEvents(params)
      .then(res => setEvents(res))
      .catch(e => console.warn(e));
  };

  useEffect(() => {
    if (selectedSport && user) {
      getEvents()
        .then(res => {
          setEvents(res);
          setLoading(false);
        })
        .catch(e => console.warn(e));
    }
    // eslint-disable-next-line
  }, []);

  if (!user) return <Redirect to="/" />;
  if (!selectedSport) return <Redirect to="/homepage" />;

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
            <CourtMap showParkings={true}></CourtMap>
            <div className={classes.eventGridListContainer}>
              <GridList className={classes.eventGridListContainer} cols={2}>
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
        <EventDetails
          event={eventSelected}
          onBack={onEventDetailsBack}
          userUUID={user.uid}
          setEvents={setEvents}
          setEventSelected={setEventSelected}
        />
      )}
      {loading && (
        <div className={classes.loadingSpinner}>
          <div className={classes.loadingSpinnerChild}>
            <ScaleLoader loading={true} color={"#1DA1F2"} />
          </div>
        </div>
      )}
    </div>
  );
};
