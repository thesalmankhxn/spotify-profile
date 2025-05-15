import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../api/spotify";
import { clearAuthAndRedirect } from "../App";
import { useAuth } from "../context/AuthContext";
import OverlayLoader from "./OverlayLoader";

interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const Callback = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);
  const { setAccessToken } = useAuth();

  // Mutation for getting the access token, with no auto-retry
  const getTokenMutation = useMutation({
    mutationFn: (code: string) => getAccessToken(code),
    retry: 0, // Disable retries
    onSuccess: (data: AuthTokens) => {
      // Save tokens in localStorage
      localStorage.setItem("spotify_access_token", data.access_token);
      localStorage.setItem("spotify_refresh_token", data.refresh_token);

      // Save token expiration time
      const expiresIn = data.expires_in;
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(
        "spotify_token_expiration",
        expirationTime.toString()
      );

      // Update context with new access token
      setAccessToken(data.access_token);

      // Invalidate any existing queries to ensure fresh data
      queryClient.invalidateQueries();

      // Navigate to profile page
      navigate("/");
    },
    onError: (error) => {
      console.error("Authentication error:", error);
      clearAuthAndRedirect();
    },
  });

  useEffect(() => {
    // Get the authorization code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    // Only process the code once and prevent duplicate calls
    if (code && !isProcessing && !getTokenMutation.isPending) {
      setIsProcessing(true);
      // Use the React Query mutation to get the access token
      getTokenMutation.mutate(code);
    } else if (!code) {
      // If there's no code in the URL, redirect to login
      navigate("/");
    }
  }, [navigate, getTokenMutation, isProcessing]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <OverlayLoader
        show={getTokenMutation.isPending}
        label="Logging you in..."
      />
    </div>
  );
};

export default Callback;
