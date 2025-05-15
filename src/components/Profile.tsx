import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { getUserProfile, refreshAccessToken } from "../api/spotify";
import { clearAuthAndRedirect } from "../App";

interface SpotifyProfile {
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  images: {
    url: string;
  }[];
  [key: string]: any;
}

const Profile = () => {
  const queryClient = useQueryClient();
  // Track if a refresh has already been attempted in this session
  const refreshAttempted = React.useRef(false);

  // Create a logout function
  const handleLogout = useCallback(() => {
    clearAuthAndRedirect();
  }, []);

  // Function to refresh the token
  const refreshTokenAndRetry = useCallback(async () => {
    const refreshToken = localStorage.getItem("spotify_refresh_token");
    if (!refreshToken) return;

    try {
      const data = await refreshAccessToken(refreshToken);
      // Save the new access token
      localStorage.setItem("spotify_access_token", data.access_token);

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

      // Invalidate queries to force a single refetch
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      await queryClient.refetchQueries({ queryKey: ["userProfile"] });

      // Reset the refresh attempt flag after successful refresh
      refreshAttempted.current = false;
    } catch (error) {
      // If refresh fails, logout
      handleLogout();
    }
  }, [queryClient, handleLogout]);

  // Use React Query to fetch user profile with controlled refetching
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<SpotifyProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: false, // Disable automatic retries
    refetchOnWindowFocus: false, // Don't refetch when window gets focus
    refetchOnMount: false, // Don't refetch when component mounts
    refetchOnReconnect: false, // Don't refetch on network reconnection
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Handle errors separately with useEffect to fix linter errors
  useEffect(() => {
    if (error) {
      // If token might be expired, try refreshing once
      const refreshToken = localStorage.getItem("spotify_refresh_token");
      const isTokenError = error.message === "Failed to fetch user profile";

      if (isTokenError && refreshToken && !refreshAttempted.current) {
        refreshAttempted.current = true;
        refreshTokenAndRetry();
      } else {
        // For any error (including failed token refresh), redirect to login
        handleLogout();
      }
    }
  }, [error, refreshTokenAndRetry, handleLogout]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  // If there's an error, we'll handle it in the useEffect and navigate away,
  // but include this as a fallback just in case
  if (error) {
    // Navigate to login screen on error instead of showing error message
    handleLogout();
    return null;
  }

  return (
    <div className="py-10 px-5 max-w-6xl mx-auto">
      <nav className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </nav>
      <header className="flex items-center mb-10">
        {profile?.images?.[0]?.url && (
          <img
            src={profile.images[0].url}
            alt="Profile"
            className="w-40 h-40 rounded-full mr-8"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold mb-2">{profile?.display_name}</h1>
          <p className="text-lg mb-1">
            <span className="font-semibold">
              {profile?.followers?.total || 0}
            </span>{" "}
            Followers
          </p>
          {profile?.external_urls?.spotify && (
            <a
              href={profile.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              Open in Spotify
            </a>
          )}
        </div>
      </header>
    </div>
  );
};

export default Profile;
