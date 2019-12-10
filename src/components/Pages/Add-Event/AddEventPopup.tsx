import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";
import { Sport } from "../../../models/Sport";
import { User } from "../../../models/User";
import { addNewEvent } from "../../../services/api";

const useStyles = makeStyles({
  textField: {
    marginBottom: "10px"
  }
});

interface AddEventProps {
  onCancel: any;
  court: any;
  sport: Sport;
  user: User;
  onError: any;
}

export const AddEventPopup = (props: AddEventProps) => {
  const classes = useStyles();
  const [event, setEvent] = useState({
    event_date: "",
    court_id: props.court.properties.ID,
    sport_id: props.sport._id,
    creator_uuid: props.user.uid,
    title: "",
    description: "",
    photo: ""
  });

  const onSubmit = () => {
    if (event.event_date && event.title && event.description) {
      event.event_date = new Date(event.event_date).getTime().toString();
      addNewEvent(event).then(() => {
        props.onCancel();
      });
    } else {
      props.onError();
    }
  };

  const handleChange = (changeEvent: any) => {
    const property: string = changeEvent.target.id;
    const value: string = changeEvent.target.value;
    setEvent({ ...event, [property]: value });
  };

  return (
    <Dialog open={true}>
      <DialogTitle>New Event</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          className={classes.textField}
          margin="dense"
          value={props.court.properties.NOMBRE}
          label="Court"
          type="text"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          disabled={true}
        />
        <TextField
          className={classes.textField}
          margin="dense"
          id="title"
          name="title"
          label="Title"
          placeholder="3x3 Match"
          onChange={handleChange}
          type="title"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          margin="dense"
          className={classes.textField}
          id="description"
          name="description"
          placeholder="Let's play a 3x3 match and have some fun"
          label="Description"
          type="text"
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
          multiline={true}
        />
        <TextField
          id="event_date"
          label="Event date"
          type="date"
          name="event_date"
          margin="dense"
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          className={classes.textField}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
