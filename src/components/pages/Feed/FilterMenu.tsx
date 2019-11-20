import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { width: "100%" }
  })
);

export const FilterMenu: React.FC = props => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
          <h1>Sports</h1>
      </Paper>
    </div>
  );
};
