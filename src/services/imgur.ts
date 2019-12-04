import axios from "axios";

export const uploadImageToImgur = (
  formData: FormData
): Promise<string> => {
  const apiUrl: string = "https://api.imgur.com/3/upload.json";
  const { REACT_APP_IMGUR_API_CLIENT_ID } = process.env;
  return axios(apiUrl, {
    method: "POST",
    headers: {
      authorization: `Client-ID ${REACT_APP_IMGUR_API_CLIENT_ID}`
    },
    data: formData
  })
    .then(response => {
      return response.data.data.link;
    })
    .catch(error => {
      return "";
    });
};
