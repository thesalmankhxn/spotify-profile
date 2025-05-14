import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import LoginScreen from "./components/LoginScreen";
import Callback from "./components/Callback";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Spotify API constants
const CLIENT_ID = "6c97a4c0578d4b309084733e6912d02f";
const CLIENT_SECRET = "f6ba014afb1b42a79038c5949c06699b";
const REDIRECT_URI = "http://localhost:5173/callback";

// Create a client
const queryClient = new QueryClient();

const AppContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full min-h-screen">{children}</div>
);

const App = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Function to refresh the token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("spotify_refresh_token");

    if (!refreshToken) return;

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();

      // Save the new access token
      localStorage.setItem("spotify_access_token", data.access_token);
      setAccessToken(data.access_token);

      // Update expiration time
      const expiresIn = data.expires_in;
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(
        "spotify_token_expiration",
        expirationTime.toString()
      );

      // If a new refresh token is provided, update it
      if (data.refresh_token) {
        localStorage.setItem("spotify_refresh_token", data.refresh_token);
      }

      return data.access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Clear tokens on error
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_refresh_token");
      localStorage.removeItem("spotify_token_expiration");
      setAccessToken(null);
      return null;
    }
  };

  // Check token and refresh if needed
  const checkAndRefreshToken = async () => {
    const token = localStorage.getItem("spotify_access_token");
    const expirationTime = localStorage.getItem("spotify_token_expiration");

    if (token && expirationTime) {
      const currentTime = new Date().getTime();

      // If token is expired or about to expire in the next 5 minutes
      if (parseInt(expirationTime) - currentTime < 300000) {
        // Token is expired or about to expire, refresh it
        const newToken = await refreshToken();
        return newToken;
      } else {
        // Token is still valid
        return token;
      }
    }

    return null;
  };

  // Check if there's a token in localStorage on component mount
  useEffect(() => {
    const initializeToken = async () => {
      const validToken = await checkAndRefreshToken();
      if (validToken) {
        setAccessToken(validToken);
      }
    };

    initializeToken();

    // Set up periodic token refresh (every 30 minutes)
    const refreshInterval = setInterval(
      () => {
        checkAndRefreshToken();
      },
      30 * 60 * 1000
    );

    return () => clearInterval(refreshInterval);
  }, []);

  // Handler to set the access token
  const handleSetToken = (token: string) => {
    localStorage.setItem("spotify_access_token", token);
    setAccessToken(token);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route
              path="/"
              element={accessToken ? <Profile /> : <LoginScreen />}
            />
            <Route
              path="/callback"
              element={<Callback setAccessToken={handleSetToken} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
