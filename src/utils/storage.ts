import { storage } from "firebase";
import { Sport } from "../models/Sport";

export const loadUserFromLocalStorage = () => {
  const storageUser = localStorage.getItem("loggedUser");

  if (storageUser !== null) {
    const parsedUser = JSON.parse(storageUser);
    const expirationDate = parsedUser["stsTokenManager"]["expirationTime"];
    const currentDate = new Date().getTime();

    if (currentDate > expirationDate) localStorage.removeItem("loggedUser");
    else return parsedUser;
  }
  return null;
};

export const loadSportFromLocalStorage = () => {
  const storageUser = loadUserFromLocalStorage();
  if (storageUser !== null) {
    const favouriteSport: Sport = storageUser.favouriteSport;
    if (favouriteSport) return favouriteSport;
    else return null;
  }
  return null;
};

export const saveUserToLocalStorage = (user: any) => {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

export const saveSportToLocalStorage = (sport: Sport) => {
    const storageUser = loadUserFromLocalStorage();
    storageUser.favouriteSport = sport;

    localStorage.setItem("loggedUser", JSON.stringify(storageUser));
}