import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Comment as CommentEntity } from "./../../../../../models/Event";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { addComment } from "./../../../../../services/API";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesChat = makeStyles((theme: Theme) =>
  createStyles({
    comments: {
      backgroundColor: "#f2f2f2",
      marginTop: "20px",
      padding: "30px",
      borderRadius: "20px"
    },
    evenComment: {
      display: "inline-block",
      padding: "4px 16px 4px 12px",
      backgroundColor: "white",
      borderRadius: "20px"
    },
    oddComment: {
      display: "inline-block",
      padding: "4px 16px 4px 12px",
      backgroundColor: "#d9d9d9",
      borderRadius: "20px"
    },
    commentContainer: {
      marginTop: "10px"
    },
    textField: { width: "100%" },
    messageContainer: { display: "flex" },
    sendButton: {
      margin: "10px",
      height: "80%",
      marginTop: "26px"
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
  eventID: string;
  userUUID: string;
}

export const Chat: React.FC<Props> = props => {
  const classes = useStylesChat();
  const [message, setMessage] = useState<string>("");

  const onSend = () => {
    // TODO: handle error
    // TODO: reload events to get new comments after fixings homepage favourite sport refactor
    addComment({
      eventID: props.eventID,
      userUUID: props.userUUID,
      message: message
    }).then(() => {
      setMessage("");
    });
  };

  return (
    <div>
      <div className={classes.messageContainer}>
        <TextField
          label="Message"
          multiline
          rowsMax="4"
          value={message}
          onChange={e => {
            setMessage(e.target.value);
          }}
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.sendButton}
          onClick={onSend}
        >
          SEND
        </Button>
      </div>
      <div className={classes.comments}>
        {props.comments.map((c, i) => {
          return (
            <div className={classes.commentContainer}>
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
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface CommentProps {
  avatar?: string;
  name?: string;
  message: string;
}

// TODO: add delete button
const Comment: React.FC<CommentProps> = props => {
  const classes = useStylesComment();
  return (
    <div>
      <Tooltip title={props.name}>
        <Avatar
          aria-label="Creator avatar"
          src={props.avatar}
          className={classes.avatar}
        ></Avatar>
      </Tooltip>
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
