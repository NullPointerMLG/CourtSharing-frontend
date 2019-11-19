import React, { useState, createContext } from "react";
import { loadUserFromLocalStorage } from "../utils/userStorage";

const anyObject: any = undefined;
export const UserContext = createContext(anyObject);

export const UserProvider = (props: { children: React.ReactNode; }) => {
  const [user, setUser] = useState(loadUserFromLocalStorage());
  
  return (<UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>);
};
