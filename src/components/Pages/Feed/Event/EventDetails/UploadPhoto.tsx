import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { uploadImageToImgur } from "../../../../../services/imgur";
import { addImage } from "../../../../../services/api";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  eventID: string;
}

export const UploadPhoto: React.FC<Props> = props => {
  const [image, setImage] = useState<File | string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

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
    const formData = new FormData();
    formData.append("type", "file");
    formData.append("image", image);
    uploadImageToImgur(formData).then(value => {
      if (value !== "") {
        addImage({ eventID: props.eventID, photoURL: value }).then(() => {
          setImage("");
        });
      }
    });
  };
  return (
    <div>
      <Dialog open={props.open} aria-labelledby="upload-dialog">
        <DialogTitle>Upload photo</DialogTitle>
        <DialogContent>
          <input
            type="file"
            style={{ display: "none" }}
            onChange={selectImage}
            id="text-button-file"
          />
          <label htmlFor="text-button-file">
            <Button variant="contained" color="primary" component="span">
              Select
            </Button>
          </label>
          {imagePreview !== "" && (
            <img src={imagePreview} alt={"image-preview"} />
          )}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
          <Button color="primary">Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
