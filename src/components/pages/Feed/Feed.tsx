import React, { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../../context/UserContext";
import { Event } from "./Event";
import { Event as EventEntity } from "./../../../models/event";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { FilterMenu } from "./FilterMenu";
import Grid from "@material-ui/core/Grid";

const eventListMock: EventEntity[] = Array(10).fill({
  title: "Meet new friends playing football",
  description: `I would like to meet new people. 
    I am new in the city and I do not have 
    friends to play with. Would  you like to join me?`,
  courtID: 101,
  sportID: 2,
  creator: {
    uuid: "5dc992c11c9d44000094e883",
    fullName: "Fran Jimenez",
    avatar:
      "data:image/png;base64,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"
  },
  eventDate: 1554336000
});

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

  if (!user) return <Redirect to="/login" />;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3}>
          <div className={classes.menuContainer}>
            <FilterMenu />
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className={classes.eventGridListContainer}>
            <GridList
              cellHeight={500}
              className={classes.eventGridListContainer}
              cols={2}
            >
              {eventListMock.map((event, i) => (
                <GridListTile key={i} cols={1} className={classes.event}>
                  <Event event={event} />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
