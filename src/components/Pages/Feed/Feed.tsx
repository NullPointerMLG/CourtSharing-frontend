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
import { CourtMap } from "./CourtMap";
import "./Feed.css";
import { SelectedSportContext } from "../../../context/SportsContext";
import { Event as EventEntity } from "../../../models/Event";
import { EventDetails } from "./Event/EventDetails/EventDetails";
import { AddEventPopup } from "./AddEventPopup";
import { Snackbar } from "@material-ui/core";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";

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
  const ERROR_AUTO_HIDE_DURATION_MS: number = 4000;
  const SNACKBAR_POSITION: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "right"
  };
  const ADD_EVENT_ERROR_MESSAGE: string = "Fill all the fields first!";
  const [user] = useContext(UserContext);
  const [selectedSport] = useContext(SelectedSportContext);
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [selectedCourt, setSelectedCourt] = useState();
  const [showError, setShowError] = useState<boolean>(false);
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
        .then(res => setEvents(res))
        .catch(e => console.warn(e));
    }
  }, []);

  if (!user) return <Redirect to="/" />;
  if (!selectedSport) return <Redirect to="/homepage" />;

  const onEventDetailsBack = () => {
    setEventSelected(undefined);
  };

  const onAddButtonClick = (selectedCourt: any) => {
    setSelectedCourt(selectedCourt);
  };

  const onCancelPopup = () => {
    setSelectedCourt(undefined);
    getEvents()
        .then(res => setEvents(res))
        .catch(e => console.warn(e));
  };

  const onSubmitError = () => {
    setShowError(true);
  };

  const handleSnackbarClose = () => {
    setShowError(false);
  };

  return (
    <div className={classes.root}>
      {showError && (
        <Snackbar
          open={showError}
          autoHideDuration={ERROR_AUTO_HIDE_DURATION_MS}
          anchorOrigin={SNACKBAR_POSITION}
          onClose={handleSnackbarClose}
          message={ADD_EVENT_ERROR_MESSAGE}
        />
      )}
      {selectedCourt && (
        <AddEventPopup
          onError={onSubmitError}
          onCancel={onCancelPopup}
          court={selectedCourt}
          sport={selectedSport}
          user={user}
        />
      )}
      {!eventSelected ? (
        <Grid container>
          <Grid item xs={3}>
            <div className={classes.menuContainer}>
              <FilterMenu handleFilterEvents={handleFilterEvents} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <CourtMap onAddEventClick={onAddButtonClick}></CourtMap>
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
        <EventDetails
          event={eventSelected}
          onBack={onEventDetailsBack}
          userUUID={user.uid}
        />
      )}
    </div>
  );
};
