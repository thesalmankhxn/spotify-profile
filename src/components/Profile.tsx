import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { getUserProfile, refreshAccessToken } from "../api/spotify";
import { useAuth } from "../context/AuthContext";
import OverlayLoader from "./OverlayLoader";

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
  const { setAccessToken, logout, isLoading: isAuthLoading } = useAuth();
  // Track if a refresh has been attempted in this session
  const refreshAttempted = React.useRef(false);

  // Function to refresh the token
  const refreshTokenAndRetry = useCallback(async () => {
    const refreshToken = localStorage.getItem("spotify_refresh_token");
    if (!refreshToken) return false;

    try {
      const data = await refreshAccessToken(refreshToken);
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

      // Invalidate queries to force a single refetch
      await queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      await queryClient.refetchQueries({ queryKey: ["userProfile"] });

      // Reset the refresh attempt flag after successful refresh
      refreshAttempted.current = false;

      return true;
    } catch (error) {
      return false;
    }
  }, [queryClient, setAccessToken]);

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<SpotifyProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: (failureCount, error) => {
      console.log("retry", failureCount, error);
      if (
        failureCount === 0 &&
        error.message === "Failed to fetch user profile" &&
        !refreshAttempted.current
      ) {
        refreshAttempted.current = true;
        // Return true to allow one retry
        return true;
      }
      return false;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
  });

  // Handle token refresh on error
  if (
    error?.message === "Failed to fetch user profile" &&
    !refreshAttempted.current
  ) {
    refreshTokenAndRetry().then((success) => {
      if (!success) {
        logout();
      }
    });
  } else if (error) {
    logout();
  }

  if (isLoading || isAuthLoading) {
    return <OverlayLoader show={true} />;
  }

  if (error) {
    return null;
  }

  return (
    <div className="py-10 px-5 max-w-6xl mx-auto">
      <nav className="flex justify-end mb-4">
        <button
          onClick={logout}
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
