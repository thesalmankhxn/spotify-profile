import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/Profile";
import LoginScreen from "./components/LoginScreen";
import Callback from "./components/Callback";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/Layout";
// Create a client with better defaults for Spotify API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false, // Disable automatic retries
      refetchOnWindowFocus: false, // Don't refetch when window gets focus
      refetchOnMount: false, // Don't refetch when component mounts
      refetchOnReconnect: false, // Don't refetch on network reconnection
    },
    mutations: {
      retry: false, // Disable automatic retries for mutations
    },
  },
});

const AppContainer = ({ children }: { children: React.ReactNode }) => (
  <Layout>{children}</Layout>
);

// Helper function to clear tokens and redirect
export const clearAuthAndRedirect = () => {
  localStorage.removeItem("spotify_access_token");
  localStorage.removeItem("spotify_refresh_token");
  localStorage.removeItem("spotify_token_expiration");
  window.location.href = "/";
};

const AuthProvider = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      // Check if token is expired
      const expirationTime = localStorage.getItem("spotify_token_expiration");
      if (expirationTime) {
        const currentTime = new Date().getTime();
        if (parseInt(expirationTime) < currentTime) {
          // Token is expired, clear it
          clearAuthAndRedirect();
          return;
        }
      }
      setAccessToken(token);
    }

    // Listen for storage events (for multi-tab support)
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

  return (
    <Routes>
      <Route path="/" element={accessToken ? <Profile /> : <LoginScreen />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContainer>
          <AuthProvider />
        </AppContainer>
      </BrowserRouter>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
