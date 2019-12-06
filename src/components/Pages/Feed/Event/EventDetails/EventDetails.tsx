import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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
import { getCourtDetails } from "./../../../../../services/API";

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
    map: { marginTop: "16px" }
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
