import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    name: {
      display: "inline-block",
      verticalAlign: "top"
    },
    avatar: {
      display: "inline-block",
      marginRight: 10
    }
  })
);

interface Props {
  avatar?: string;
  name?: string;
  size: number;
}

export const UserInfo: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        style={{ width: props.size, height: props.size }}
        aria-label="Creator avatar"
        src={props.avatar}
        className={classes.avatar}
      ></Avatar>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.name}
      >
        {props.name}
      </Typography>
    </div>
  );
};
