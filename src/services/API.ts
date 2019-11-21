import { EventParams } from "../models/EventParams";
const API_URL: string = "http://localhost:5000";

export const login = async (accessToken: Promise<string>) => {
  const token: string = await accessToken;

  return fetch(API_URL + "/login", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ token: token })
  })
    .then(res => res.json())
    .catch(error => console.error("Error:", error));
};

export const getEvents = (params?: EventParams) => {
  const emptyQuery = "";
  let query: string = emptyQuery;

  if (params) {
    query += params.date ? "?date=" + params.date : emptyQuery;
    query += params.court ? "?court=" + params.court : emptyQuery;
  }
  return fetch(API_URL + "/events" + query, { method: "GET", mode: "no-cors" });
};
