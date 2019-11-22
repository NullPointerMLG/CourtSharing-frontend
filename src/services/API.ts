import { ErrorMessage } from "./../models/ErrorMessage";
import { EventParams } from "../models/EventParams";
import { Observable, from } from "rxjs";
import { tap } from "rxjs/operators";

const API_URL: string = "http://localhost:5000";

export const login = (
  accessToken: string
): Observable<boolean | ErrorMessage> => {
  const token: string = accessToken;

  return from(
    fetch(API_URL + "/login", {
      method: "POST",
      body: JSON.stringify({ token: token })
    })
  ).pipe(
    tap((response: any) => {
      console.log(response);
      if (response.status !== 200) throw new Error(JSON.stringify(Response));
    })
  );
};

export const getEvents = (params?: EventParams) => {
  const emptyQuery = "";
  let query: string = emptyQuery;

  if (params) {
    query += params.date ? "?date=" + params.date : emptyQuery;
    query += params.court ? "?court=" + params.court : emptyQuery;
  }
  return Observable.create((observer: any) => {
    fetch(API_URL + "/events" + query, { method: "GET" })
      .then(data => {
        if (data.status !== 200) throw new Error(JSON.stringify(data));
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
};

export const addNewEvent = (event: Event) => {
  return Observable.create((observer: any) => {
    fetch(API_URL + "/events", {
      method: "POST",
      body: JSON.stringify(event)
    })
      .then(data => {
        if (data.status !== 200) throw new Error(JSON.stringify(data));
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
};
