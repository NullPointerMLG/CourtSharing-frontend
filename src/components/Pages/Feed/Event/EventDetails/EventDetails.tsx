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
import { Button } from "@material-ui/core";
import { Chat } from "./Chat";
import { Map } from "./../../../../Utils/Map";
import { GeoJsonObject } from "geojson";
import { getCourtDetails } from "./../../../../../services/api";
import { uploadImageToImgur } from "../../../../../services/imgur";
import { addImage } from "../../../../../services/api";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

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
      transform: "translateZ(0)"
    },
    addPhoto: {
      top: "100px",
      right: "-200px"
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
  const [court, setCourt] = useState<GeoJsonObject>();

  const { event } = props;
  useEffect(() => {
    getCourtDetails(event.courtID, event.sport._id.$oid)
      .then(res => {
        setCourt(res);
      })
      .catch(e => console.warn(e));
  }, [event.courtID, event.sport._id.$oid]);

  const classes = useStyles();

  const [image, setImage] = useState<File | string>("");

  const selectImage = event => {
    setImage(event.target.files[0]);
  };

  const uploadImage = event => {
    const formData = new FormData();
    formData.append("type", "file");
    formData.append("image", image);
    uploadImageToImgur(formData).then(value => {
      if (value !== "") {
        addImage({ eventID: props.event.id, photoURL: value }).then(() => {
          setImage("");
        });
      }
    });
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
                  <ListItemText
                    primary={"Event date"}
                    secondary={formatDate(props.event.eventDate)}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionRoundedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Description"
                    secondary={props.event.description}
                  />
                </ListItem>
              </List>
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
              <Grid item xs={9}>
                <GridList
                  className={classes.photoGridList}
                  cellHeight={250}
                  cols={2.5}
                >
                  {props.event.photos.map((p, i) => (
                    <GridListTile key={i} cols={1}>
                      <img src={p} alt={"event"} />
                    </GridListTile>
                  ))}
                </GridList>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <Fab
                    className={classes.addPhoto}
                    color="primary"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </div>
              </Grid>
            </Grid>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={selectImage}
              id="text-button-file"
            />
            <label htmlFor="text-button-file">
              <Button variant="contained" color="primary" component="span">
                Select
              </Button>
            </label>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={uploadImage}
            >
              Upload
            </Button>
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
