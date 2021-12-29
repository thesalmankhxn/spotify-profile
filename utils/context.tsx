import { useContext, useState } from "react";
import { createContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";

export interface IAppContext {
  token: string;
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}

const AppContext = createContext(null);

export const AppProvider = ({ children, token, spotify }) => {
  const value: IAppContext = {
    token,
    spotify,
  };
  return (
    <AppContext.Provider value={{ value }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
