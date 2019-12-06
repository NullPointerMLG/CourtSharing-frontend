import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { uploadImageToImgur } from "../../../../../services/imgur";
import { addImage } from "../../../../../services/api";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minWidth: "600px", height: "auto" },
    image: {
      maxHeight: "40vh",
      width: "auto"
    },
    dialogPaper: {
      minHeight: "60vh",
      maxHeight: "60vh",
      minWidth: "70vw"
    },
    imageContainer: {
      textAlign: "center"
    },
    uploadButton: { marginTop: "8px" }
  })
);

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  eventID: string;
  onUpload: () => void;
}

export const UploadPhoto: React.FC<Props> = props => {
  const [image, setImage] = useState<File | string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const classes = useStyles();

  const selectImage = async event => {
    setImage(event.target.files[0]);
    let imageBase64 = await getBase64(event.target.files[0]);
    setImagePreview(imageBase64);
  };

  const getBase64 = (image: File): Promise<string> => {
    return new Promise<string>(resolve => {
      let reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result == "string") {
          resolve(reader.result);
        }
      };
      reader.readAsDataURL(image);
    });
  };

  const uploadImage = event => {
    if (image === null) return;
    props.setOpen(false);
    const formData = new FormData();
    formData.append("type", "file");
    formData.append("image", image);
    uploadImageToImgur(formData).then(value => {
      if (value !== "") {
        addImage({ eventID: props.eventID, photoURL: value }).then(() => {
          setImage("");
        });
      }
      setImagePreview("");
      props.onUpload();
    });
  };

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={props.open}
        aria-labelledby="upload-dialog"
      >
        <DialogTitle>Upload photo</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={selectImage}
                id="text-button-file"
              />
              <label htmlFor="text-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<SearchIcon />}
                >
                  Select
                </Button>
              </label>
              {imagePreview && (
                <div className={classes.uploadButton}>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    onClick={uploadImage}
                  >
                    Upload
                  </Button>
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              {imagePreview !== "" && (
                <div className={classes.imageContainer}>
                  <img
                    className={classes.image}
                    src={imagePreview}
                    alt={"image-preview"}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
