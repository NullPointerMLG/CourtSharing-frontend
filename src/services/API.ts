import { ErrorMessage } from "./../models/ErrorMessage";
import { EventParams } from "../models/EventParams";
import { Event } from "../models/Event";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Sport } from "../models/Sport";
import { fromFetch } from "rxjs/fetch";

const API_URL: string = "http://localhost:5000";

export const login = (
  accessToken: string
): Observable<boolean | ErrorMessage> => {
  const token: string = accessToken;

  return fromFetch(API_URL + "/login", {
    method: "POST",
    body: JSON.stringify({ token: token })
  }).pipe(
    map((response: any) => {
      if (response.status !== 200)
        throw new Error(JSON.stringify(response.json()));
      return response.json();
    })
  );
};

export const getEvents = (params?: EventParams): Observable<Event[]> => {
  const emptyQuery = "";
  let query: string = emptyQuery;

  if (params) {
    query += params.date ? "?date=" + params.date : emptyQuery;
    query += params.court ? "?court=" + params.court : emptyQuery;
  }
  return fromFetch(API_URL + "/events" + query, { method: "GET" }).pipe(
    map((response: any) => {
      if (response.status !== 200)
        throw new Error(JSON.stringify(response.json()));
      return response.json();
    })
  );
};

export const addNewEvent = (event: Event): Observable<Event> => {
  return fromFetch(API_URL + "/events", {
    method: "POST",
    body: JSON.stringify(event)
  }).pipe(
    map((response: any) => {
      if (response.status !== 200)
        throw new Error(JSON.stringify(response.json()));
      return response.json();
    })
  );
};

export const getSports = (): Promise<Sport[]> => {
  return fetch(API_URL + "/sports", { method: "GET" })
    .then((response: Response) => {
      if (response.status !== 200)
        throw new Error(JSON.stringify(response.json()));
      return response.json();
    })
};
