import { ErrorMessage } from "./../models/ErrorMessage";
import { EventParams } from "../models/EventParams";
import { Event } from "../models/Event";
import { Sport } from "../models/Sport";

const API_URL: string = "http://localhost:5000";

export const login = (accessToken: string): Promise<boolean | ErrorMessage> => {
  const token: string = accessToken;

  return fetch(API_URL + "/login", {
    method: "POST",
    body: JSON.stringify({ token: token }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then((response: any) => {
      if (response.status !== 200) throw new Error(JSON.stringify(Response));
      return response.json();
    })
    .catch(err => err.json());
};

export const getEvents = (params?: EventParams): Promise<Event[]> => {
  const emptyQuery = "";
  let query: string = emptyQuery;

  if (params) {
    query += params.date ? "?date=" + params.date : emptyQuery;
    query += params.court ? "?court=" + params.court : emptyQuery;
  }

  return fetch(API_URL + "/events" + query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => {
      if (data.status !== 200) throw new Error(JSON.stringify(data));
      return data.json();
    })
    .catch(err => err.json());
};

export const getSports = (): Promise<Sport[]> => {
  return fetch(API_URL + "/sports", { method: "GET" })
    .then((response: Response) => {
      if (response.status !== 200)
        throw new Error(JSON.stringify(response.json()));
      return response.json();
    })
    .catch(err => err.json());
};

export const addNewEvent = (event: Event): Promise<Event> => {
  return fetch(API_URL + "/events", {
    method: "POST",
    body: JSON.stringify(event)
  })
    .then(data => {
      if (data.status !== 200) throw new Error(JSON.stringify(data));
      return data.json();
    })
    .catch(err => err.json());
};
