import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Event as EventEntity } from "../../../../models/Event";
import { UserInfo } from "./../../../Utils/UserInfo";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";
import {
  updateEvent,
  getEvents,
  getCourtDetails
} from "./../../../../services/api";
import { Map } from "./../../../Utils/Map";
import { GeoJsonObject } from "geojson";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
      margin: "6px"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: "white"
    },

    description: {
      marginTop: "16px"
    },
    assistContainer: {
      display: "flex"
    },
    assistButton: {
      marginLeft: "auto"
    },
    map: {
      marginBottom: "10px"
    },
    userInfo: {
      margin: "10px 0px 10px 0px"
    }
  })
);

interface Props {
  event: EventEntity;
  onClick: (event: EventEntity) => void;
  userUUID: string;
  setEvents: (events: EventEntity[]) => void;
}

export function formatDate(value: number): string {
  const date: Date = new Date(value*1000);
  return date.toLocaleDateString();
}

export const Event: React.FC<Props> = props => {
  const classes = useStyles();
  const [assist, setAssist] = useState<boolean>();
  const [court, setCourt] = useState<GeoJsonObject>();
  const { event, userUUID } = props;

  useEffect(() => {
    getCourtDetails(event.courtID, event.sport._id.$oid)
      .then(res => {
        setCourt(res);
      })
      .catch(e => console.warn(e));
  }, [event.courtID, event.sport._id.$oid]);

  useEffect(() => {
    let found = false;
    for (let key in event.participants) {
      if (event.participants[key].uuid === userUUID) {
        setAssist(true);
        found = true;
        break;
      }
    }
    if (!found) {
      setAssist(false);
    }
  }, [event.participants, userUUID]);

  const onClickAssist = () => {
    updateEvent(props.event.id, { 
      participantUUID: props.userUUID,
      eventDate: null,
      title: null,
      description: null })
      .then(() => {
        reloadEvents();
      })
      .catch(e => console.warn(e));
  };

  const reloadEvents = () => {
    getEvents()
      .then(res => props.setEvents(res))
      .catch(e => console.warn(e));
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.event.sport.marker_url}
          ></Avatar>
        }
        title={props.event.title}
        subheader={formatDate(props.event.eventDate)}
        onClick={() => props.onClick(props.event)}
      />
      <CardContent>
        {court && (
          <div className={classes.map}>
            <Map sport={props.event.sport} court={court} />
          </div>
        )}
        <Divider />
        <div className={classes.userInfo}>
          <UserInfo
            avatar={props.event.creator.photoURL}
            name={props.event.creator.name}
            size={24}
          />
        </div>
        <Divider />
        <Typography
          className={classes.description}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.event.description}
        </Typography>
        {props.event.creator.uuid !== props.userUUID && (
          <div className={classes.assistContainer}>
            <Button
              variant="contained"
              color={!assist ? "primary" : "secondary"}
              className={classes.assistButton}
              onClick={onClickAssist}
            >
              {!assist ? "Assist" : "Cancel"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
