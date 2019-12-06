import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {}

export const UploadPhoto: React.FC<Props> = props => {
  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="upload-dialog"
      >
        <DialogTitle>Upload photo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Cancel
          </Button>
          <Button color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
