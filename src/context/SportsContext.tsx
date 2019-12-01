import React, { useState, createContext } from "react";
import { Sport } from "../models/Sport";
const emptySports: any = [];
const emptySport: any = undefined
export const SportsContext = createContext(emptySports);
export const SelectedSportContext = createContext(emptySport);

export const SportsProvider = (props: { children: React.ReactNode; }) => {
  const [sports, setSports] = useState(emptySports);
  
  return (<SportsContext.Provider value={[sports, setSports]}>{props.children}</SportsContext.Provider>);
};

export const SelectedSportProvider = (props: { children: React.ReactNode; }) => {
  const [selectedSport, setSelectedSport] = useState();  
  
  return (<SelectedSportContext.Provider value={[selectedSport, setSelectedSport]}>{props.children}</SelectedSportContext.Provider>);
};
