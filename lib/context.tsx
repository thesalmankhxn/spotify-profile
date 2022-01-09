import { createContext, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import cookie from "js-cookie";

export interface IAppContext {
  token: string;
  spotify: SpotifyWebApi.SpotifyWebApiJs;
  theme: string;
}

const AppContext = createContext(null);

export const AppProvider = ({ children, token, spotify, theme }) => {
  const value: IAppContext = {
    token,
    spotify,
    theme,
  };
  return (
    <AppContext.Provider value={{ value }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
