import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/pages/Profile";
import Artists from "./components/pages/Artists";
import Tracks from "./components/pages/Tracks";
import Recent from "./components/pages/Recent";
import Playlists from "./components/pages/Playlists";
import LoginScreen from "./components/LoginScreen";
import Callback from "./components/Callback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./components/layout";
import { AuthProvider, useAuth } from "./context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
    mutations: {
      retry: false,
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

const AppRoutes = () => {
  const { accessToken } = useAuth();

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!accessToken) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/" element={accessToken ? <Profile /> : <LoginScreen />} />
      <Route path="/callback" element={<Callback />} />

      {/* Protected Routes */}
      <Route
        path="/artists"
        element={
          <ProtectedRoute>
            <Artists />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tracks"
        element={
          <ProtectedRoute>
            <Tracks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recent"
        element={
          <ProtectedRoute>
            <Recent />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlists"
        element={
          <ProtectedRoute>
            <Playlists />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppContainer>
            <AppRoutes />
          </AppContainer>
        </AuthProvider>
      </BrowserRouter>
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
