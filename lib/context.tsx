import { createContext, useContext } from "react";

export interface IAppContext {
  theme: string;
}

const AppContext = createContext(null);

export const AppProvider = ({ children, theme }) => {
  const value: IAppContext = {
    theme,
  };
  return (
    <AppContext.Provider value={{ value }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
