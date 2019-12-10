import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../../context/UserContext";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { SelectedSportContext } from "../../../context/SportsContext";
import { AddEventPopup } from "./AddEventPopup";
import { Snackbar, Button } from "@material-ui/core";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import { CourtMap } from "../../Utils/CourtMap";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: "0 60px 0 60px"
    },
    mapContainer: {
      display: "flex"
    },
    map: {
      width: "100%",
      justifyContent: "center"
    },
    title: {
      margin: "2.5% 5%"
    },
    buttonsContainer: {
      display: "flex",
      justifyContent: "center"
    }
  })
);

export const AddEvent: React.FC = () => {
  const classes = useStyles();
  const ERROR_AUTO_HIDE_DURATION_MS: number = 4000;
  const SNACKBAR_POSITION: SnackbarOrigin = {
    vertical: "bottom",
    horizontal: "right"
  };
  const ADD_EVENT_ERROR_MESSAGE: string = "Fill all the fields first!";
  const [user] = useContext(UserContext);
  const [selectedSport] = useContext(SelectedSportContext);
  const [selectedCourt, setSelectedCourt] = useState();
  const [showPopup, setShowPopup] = useState();
  const [showError, setShowError] = useState<boolean>(false);

  if (!user) return <Redirect to="/" />;
  if (!selectedSport) return <Redirect to="/homepage" />;

  const onMarkerClick = (court: any) => {
    setSelectedCourt(court);
  };

  const onMarkerUnclicked = () => {
    setSelectedCourt(undefined);
  };

  const onCancelPopup = () => {
    setShowPopup(false);
  };

  const onSubmitError = () => {
    setShowError(true);
  };

  const handleSnackbarClose = () => {
    setShowError(false);
  };

  const showAddEventPopup = () => {
    setShowPopup(true);
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

      <h2 className={classes.title}>Select a court to create a event</h2>

      {selectedCourt && showPopup && (
        <AddEventPopup
          onError={onSubmitError}
          onCancel={onCancelPopup}
          court={selectedCourt}
          sport={selectedSport}
          user={user}
        />
      )}

      <div className={classes.mapContainer}>
        <div className={classes.map}>
          <CourtMap
            onMarkerClick={onMarkerClick}
            onMarkerUnclicked={onMarkerUnclicked}
          />
        </div>
      </div>

      <div className={classes.buttonsContainer}>
        <Button
          color="primary"
          variant="contained"
          disabled={!selectedCourt}
          onClick={showAddEventPopup}
        >
          <AddIcon />
          Add event
        </Button>
      </div>
    </div>
  );
};
