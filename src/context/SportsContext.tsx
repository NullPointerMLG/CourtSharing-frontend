import React, { useState, createContext } from "react";
import { getSports } from "../services/API";
import { Sport } from "../models/Sport";

const emptySports: any = [];
export const SportsContext = createContext(emptySports);
export const FavouriteSportsContext = createContext(emptySports);

export const SportsProvider = (props: { children: React.ReactNode; }) => {
  const [sports, setSports] = useState(emptySports);  

  if (sports.length === 0) {
      getSports().then((responseSports: Sport[]) => setSports(responseSports))
  }
  
  return (<SportsContext.Provider value={[sports, setSports]}>{props.children}</SportsContext.Provider>);
};

export const FavouriteSportProvider = (props: { children: React.ReactNode; }) => {
  const [favouriteSports, setFavouriteSports] = useState(emptySports);  
  
  return (<FavouriteSportsContext.Provider value={[favouriteSports, setFavouriteSports]}>{props.children}</FavouriteSportsContext.Provider>);
};
