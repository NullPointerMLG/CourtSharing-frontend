import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Event } from "../../../../models/Event";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Typography from "@material-ui/core/Typography";
import { formatDate } from "./Event";
import { UserInfo } from "./../../../Utils/UserInfo";

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
    }
  })
);

interface Props {
  event: Event;
}

export const EventDetails: React.FC<Props> = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
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
          <Grid item xs={6}></Grid>
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
              {props.event.participants.map(p => {
                return (
                  <div className={classes.participant}>
                    <UserInfo avatar={p.photoURL} name={p.name} />
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
