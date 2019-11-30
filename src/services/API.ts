import { GeoJsonObject } from "geojson";
import { EventParams } from "./../models/EventParams";
import { EventUpdateParams } from "./../models/Event";
import { ErrorMessage } from "./../models/ErrorMessage";
import { Event } from "../models/Event";
import { Sport } from "../models/Sport";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL: string = "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

const requestHandler = (request: AxiosRequestConfig) => {
  const loggedUser: string | null = localStorage.getItem("loggedUser");
  if (loggedUser) {
    const firebaseUser = JSON.parse(loggedUser);
    const token: string = firebaseUser.stsTokenManager.accessToken;
    request.headers = { ...request.headers, Authorization: token };
  }

  request.headers = {
    ...request.headers,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  return request;
};

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) =>
  requestHandler(config)
);

export const login = (accessToken: string): Promise<number | ErrorMessage> => {
  return axios
    .post(BASE_URL + "/login", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      data: { token: accessToken }
    })
    .then((response: any) => {
      if (response.status !== 200) throw new Error(JSON.stringify(Response));
      return response.data;
    });
};

export const getEvents = (params?: EventParams): Promise<Event[]> => {
  return axiosInstance
    .get("/events", {
      params: params
    })
    .then((response: AxiosResponse) => {
      if (response.status !== 200) throw new Error(JSON.stringify(response));
      return response.data;
    });
};

export const updateEvent = (
  eventID: string,
  params: EventUpdateParams
): Promise<boolean | ErrorMessage> => {
  return axiosInstance
    .put(BASE_URL + "/events/" + eventID, {
      params
    })
    .then((response: any) => {
      if (response.status !== 200) throw new Error(JSON.stringify(Response));
      return response.data;
    });
};

export const getSports = (): Promise<Sport[]> => {
  return axiosInstance.get("/sports").then((response: AxiosResponse) => {
    if (response.status !== 200) throw new Error(JSON.stringify(response.data));
    return response.data;
  });
};

export const getCourts = (sportId: string): Promise<GeoJsonObject> => {
  return axiosInstance
    .get("/courts", { params: { id: sportId } })
    .then((response: AxiosResponse) => {
      if (response.status !== 200)
        throw new Error(JSON.stringify(response.data));
      return response.data;
    })
    .then(response => {
      const resGeoJson = response as unknown;
      return resGeoJson as GeoJsonObject;
    });
};

export const addNewEvent = (event: Event): Promise<Event> => {
  return axiosInstance
    .post("/events", { data: JSON.stringify(event) })
    .then((response: AxiosResponse) => {
      if (response.status !== 200)
        throw new Error(JSON.stringify(response.data));
      return response.data;
    });
};
