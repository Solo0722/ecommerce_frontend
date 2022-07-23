import React, { createContext } from "react";
import { commerce } from "../lib/commerce";

export const AppContext = createContext();

const Context = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default Context;
