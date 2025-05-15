import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { clearAuthAndRedirect } from "../App";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      const expirationTime = localStorage.getItem("spotify_token_expiration");
      if (expirationTime) {
        const currentTime = new Date().getTime();
        if (parseInt(expirationTime) < currentTime) {
          clearAuthAndRedirect();
          setIsLoading(false);
          return;
        }
      }
      setAccessToken(token);
    }
    setIsLoading(false);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "spotify_access_token") {
        if (e.newValue) {
          setAccessToken(e.newValue);
        } else {
          setAccessToken(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    clearAuthAndRedirect();
  };

  const value = {
    accessToken,
    setAccessToken,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
