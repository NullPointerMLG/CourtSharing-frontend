import React, { useState, createContext } from "react";
const emptySports: any = [];
export const SportsContext = createContext(emptySports);
export const FavouriteSportContext = createContext(emptySports);

export const SportsProvider = (props: { children: React.ReactNode; }) => {
  const [sports, setSports] = useState(emptySports);
  
  return (<SportsContext.Provider value={[sports, setSports]}>{props.children}</SportsContext.Provider>);
};

export const FavouriteSportProvider = (props: { children: React.ReactNode; }) => {
  const [favouriteSport, setFavouriteSport] = useState();  
  
  return (<FavouriteSportContext.Provider value={[favouriteSport, setFavouriteSport]}>{props.children}</FavouriteSportContext.Provider>);
};
