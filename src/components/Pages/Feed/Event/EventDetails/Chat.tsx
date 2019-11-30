import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Comment as CommentEntity } from "./../../../../../models/Event";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStylesChat = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#f2f2f2",
      marginTop: "20px",
      padding: "30px",
      borderRadius: "20px"
    },
    evenComment: {
      display:'inline-block',
      padding: "4px 16px 4px 12px",
      backgroundColor: "white",
      borderRadius: "20px"
    },
    oddComment: {
      display:'inline-block',
      padding: "4px 16px 4px 12px",
      backgroundColor: "#d9d9d9",
      borderRadius: "20px"
    }
  })
);

const useStylesComment = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      display: "inline-block",
      marginRight: "10px"
    },
    message: {
      display: "inline-block",
      verticalAlign: "super",
      paddingLeft: "10px"
    }
  })
);

function isEven(number: number): boolean {
  return number % 2 === 0;
}

interface Props {
  comments: CommentEntity[];
}

export const Chat: React.FC<Props> = props => {
  const classes = useStylesChat();
  return (
    <div className={classes.root}>
      {props.comments.map((c, i) => {
        return (
          <div
            key={i}
            className={isEven(i) ? classes.evenComment : classes.oddComment}
          >
            <Comment
              avatar={c.user.photoURL}
              name={c.user.name}
              message={c.message}
            />
          </div>
        );
      })}
    </div>
  );
};

interface CommentProps {
  avatar?: string;
  name?: string;
  message: string;
}

const Comment: React.FC<CommentProps> = props => {
  const classes = useStylesComment();
  return (
    <div>
      <Avatar
        aria-label="Creator avatar"
        src={props.avatar}
        className={classes.avatar}
      ></Avatar>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.message}
      >
        {props.message}
      </Typography>
    </div>
  );
};
