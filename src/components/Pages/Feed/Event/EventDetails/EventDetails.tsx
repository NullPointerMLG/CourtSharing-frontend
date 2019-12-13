import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Event } from "../../../../../models/Event";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Typography from "@material-ui/core/Typography";
import { formatDate } from "../Event";
import { UserInfo } from "../../../../Utils/UserInfo";
import { Button, TextField } from "@material-ui/core";
import { Chat } from "./Chat";
import { Map } from "./../../../../Utils/Map";
import { GeoJsonObject } from "geojson";
import { getCourtDetails, updateEvent } from "./../../../../../services/api";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { UploadPhoto } from "./UploadPhoto";
import { getEvents } from "../../../../../services/api";
import ScaleLoader from "react-spinners/ScaleLoader";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    sectionTitle: {
      fontSize: "24px"
    },
    participantsContainer: {
      marginTop: "20px",
      display: "flex",
      flexWrap: "wrap"
    },
    participant: {
      padding: "10px",
      borderRadius: "20px",
      backgroundColor: "#ededed",
      margin: "4px"
    },
    backButton: {
      marginBottom: "20px"
    },
    map: { marginTop: "16px" },
    photoGridList: {
      flexWrap: "nowrap",
      transform: "translateZ(0)",
      minHeight: "250px"
    },
    addPhoto: {
      top: "100px",
      right: "-100px"
    }
  })
);

interface Props {
  event: Event;
  onBack: () => void;
  userUUID: string;
  setEvents: (events: Event[]) => void;
  setEventSelected: (event: Event) => void;
}

export const EventDetails: React.FC<Props> = props => {
  const classes = useStyles();
  const [dialog, setDialog] = useState<boolean>(false);
  const [court, setCourt] = useState<GeoJsonObject>();
  const [edit, setEdit] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [date, setDate] = useState<number | null>(null);
  const [description, setDescription] = useState(props.event.description)
  const [title, setTitle] = useState(props.event.title)
  const [loading, setLoading] = useState(false)
  const { event } = props;

  useEffect(() => {
    getCourtDetails(event.courtID, event.sport._id.$oid)
      .then(res => {
        setCourt(res);
      })
      .catch(e => console.warn(e));
  }, [event.courtID, event.sport._id.$oid]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date !== null) {  
      setDate(parseInt((date.getTime()/1000).toFixed(0)));
    } else {
      setDate(date)
    }
  };
  
  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  }

  const handleTitleChange = event => {
    setTitle(event.target.value);
  }

  const submitChanges = () => {
    setEdit(false);
    if (description) {  
      event.description = description;
    }
    if (date) {  
      event.eventDate = date;
    }    
    if (title) {  
      event.title = title;
    }
    updateEvent(event.id, {
      participantUUID: null,
      eventDate: event.eventDate,
      title: event.title,
      description: event.description});
  }

  const reloadEvents = () => {
    getEvents()
      .then(res => {
        props.setEvents(res);
        props.setEventSelected(res.filter(e => e.id === props.event.id)[0]);
      })
      .catch(e => console.warn(e));
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={props.onBack}
          className={classes.backButton}
        >
          BACK
        </Button>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div>
            {!edit ? <Typography
                  variant="body2"
                  component="h1"
                  className={classes.sectionTitle}
                >
                  {title}
                </Typography>:
                  <TextField
                  fullWidth
                  // className={classes.textField}
                  margin="dense"
                  value={title}  
                  onChange={handleTitleChange}
                  label="Title"
                  type="text"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  />
                }
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Creator"}
                    secondary={props.event.creator.name}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DateRangeRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={"Creation date"}
                    secondary={formatDate(props.event.creationDate)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DateRangeRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!edit ? <ListItemText
                    primary={"Event date"}
                    secondary={formatDate(props.event.eventDate)}
                  />: 
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="dense"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>}
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {!edit ? <ListItemText
                    primary="Description"
                    secondary={props.event.description}
                  />: <TextField
                  fullWidth
                  margin="dense"
                  value={description}  
                  onChange={handleDescriptionChange}
                  label="Description"
                  type="text"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  />}
                </ListItem>
              </List>
              {event.creator.uuid === props.userUUID && !edit && <Button
              variant="outlined"
              color="primary"
              onClick={() => setEdit(true)}
              className={classes.backButton}
              >
                Edit
              </Button>}
              {edit === true && <Button
              variant="outlined"
              color="primary"
              onClick={submitChanges}
              className={classes.backButton}
              >
                Save
              </Button>}
            </div>
          </Grid>
          
          <Grid item xs={6}>
            {court && (
              <>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.sectionTitle}
                >
                  {court[0].properties.NOMBRE}
                </Typography>
                <Divider />
                <div className={classes.map}>
                  <Map sport={props.event.sport} court={court} />
                </div>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.sectionTitle}
            >
              Participants
            </Typography>
            <Divider />
            <div className={classes.participantsContainer}>
              {props.event.participants.map((p, index) => {
                return (
                  <div className={classes.participant} key={index}>
                    <UserInfo avatar={p.photoURL} name={p.name} size={24} />
                  </div>
                );
              })}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.sectionTitle}
            >
              Images
            </Typography>
            <Divider />
            <br />
            <Grid container>
              <Grid item xs={3}>
                <div>
                  <Fab
                    className={classes.addPhoto}
                    color="primary"
                    aria-label="add"
                    onClick={() => setDialog(true)}
                  >
                    <AddIcon />
                  </Fab>  
                  <UploadPhoto
                    open={dialog}
                    setOpen={setDialog}
                    eventID={props.event.id}
                    onUpload={reloadEvents}
                    setLoading={setLoading}
                    setEvents={props.setEvents}
                    setEventSelected={props.setEventSelected}
                  />
                </div>
              </Grid>
              <Grid item xs={9}>
                <GridList
                  className={classes.photoGridList}
                  cellHeight={250}
                  cols={2.5}
                >
                  
                  {loading && 
                  <ScaleLoader loading={true} color={"#1DA1F2"} />}
                  {props.event.photos.map((p, i) => (
                    <GridListTile key={i} cols={1}>
                      <img src={p} alt={"event"} />
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.sectionTitle}
            >
              Thread
            </Typography>
            <Divider />
            <div>
              <Chat
                comments={props.event.comments}
                eventID={props.event.id}
                userUUID={props.userUUID}
                setEvents={props.setEvents}
                setEventSelected={props.setEventSelected}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
