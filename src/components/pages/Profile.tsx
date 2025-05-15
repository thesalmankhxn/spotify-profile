import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import {
  getUserProfile,
  refreshAccessToken,
  getUserFollowing,
  getUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../../api/spotify";
import { useAuth } from "../../context/AuthContext";
import OverlayLoader from "../OverlayLoader";
import { Link } from "react-router-dom";

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

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  artists: {
    name: string;
  }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyFollowing {
  artists: {
    total: number;
  };
}

interface SpotifyPlaylists {
  total: number;
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
    isLoading: isProfileLoading,
    error: profileError,
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

  const { data: following, isLoading: isFollowingLoading } =
    useQuery<SpotifyFollowing>({
      queryKey: ["userFollowing"],
      queryFn: getUserFollowing,
      staleTime: 5 * 60 * 1000,
    });

  const { data: playlists, isLoading: isPlaylistsLoading } =
    useQuery<SpotifyPlaylists>({
      queryKey: ["userPlaylists"],
      queryFn: getUserPlaylists,
      staleTime: 5 * 60 * 1000,
    });

  const { data: topArtists, isLoading: isTopArtistsLoading } = useQuery({
    queryKey: ["topArtists"],
    queryFn: getTopArtists,
    staleTime: 5 * 60 * 1000,
  });

  const { data: topTracks, isLoading: isTopTracksLoading } = useQuery({
    queryKey: ["topTracks"],
    queryFn: getTopTracks,
    staleTime: 5 * 60 * 1000,
  });

  // Handle token refresh on error
  if (
    profileError?.message === "Failed to fetch user profile" &&
    !refreshAttempted.current
  ) {
    refreshTokenAndRetry().then((success) => {
      if (!success) {
        logout();
      }
    });
  } else if (profileError) {
    logout();
  }

  if (
    isProfileLoading ||
    isFollowingLoading ||
    isPlaylistsLoading ||
    isTopArtistsLoading ||
    isTopTracksLoading ||
    isAuthLoading
  ) {
    return <OverlayLoader show={true} />;
  }

  if (profileError) {
    return null;
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="py-10 px-5 max-w-6xl mx-auto flex flex-col items-center">
      {/* <nav className="flex justify-end mb-4">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </nav> */}
      <header className="flex flex-col items-center mb-4">
        {profile?.images?.[0]?.url && (
          <img
            src={profile.images[0].url}
            alt="Profile"
            className="w-36 h-36 rounded-full"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold mt-4 mb-2">
            <a
              href={profile?.external_urls?.spotify!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-off-green"
            >
              {profile?.display_name}
            </a>
          </h1>
        </div>
      </header>
      <div className="grid grid-cols-3 gap-4 max-w-sm text-center">
        <div>
          <h2 className="text-lg font-bold text-green-500">
            {profile?.followers?.total || 0}
          </h2>
          <p className="text-gray-300 uppercase tracking-wider">Followers</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-green-500">
            {following?.artists?.total || 0}
          </h2>
          <p className="text-gray-300 uppercase tracking-wider">Following</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-green-500">
            {playlists?.total || 0}
          </h2>
          <p className="text-gray-300 uppercase tracking-wider">Playlists</p>
        </div>
      </div>
      <button
        onClick={logout}
        className="bg-transparent text-white border border-white rounded-[30px] mt-6 px-[30px] py-3 text-xs font-bold uppercase tracking-[1px] hover:bg-white hover:text-black transition-colors duration-[250ms] cursor-pointer"
      >
        Logout
      </button>
      <div className="w-full mt-16 grid md:grid-cols-1 grid-cols-2 gap-16">
        <section>
          <div className="flex justify-between items-center mb-8 gap-x-4">
            <h2 className="text-lg font-bold mb-0">Top Artists of All Time</h2>
            <Link
              to="/artists"
              className="bg-transparent whitespace-nowrap text-white border border-white rounded-full px-8 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              See More
            </Link>
          </div>
          <div className="space-y-4">
            {topArtists?.items?.map((artist: SpotifyArtist) => (
              <a
                key={artist.id}
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group hover:bg-gray-900 p-2 rounded-lg transition-colors"
              >
                <img
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="ml-4 text-white group-hover:text-green-500 transition-colors">
                  {artist.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-8 gap-x-4">
            <h2 className="text-lg font-bold mb-0">Top Tracks of All Time</h2>
            <Link
              to="/tracks"
              className="bg-transparent whitespace-nowrap text-white border border-white rounded-full px-8 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              See More
            </Link>
          </div>
          <div className="space-y-4">
            {topTracks?.items?.map((track: SpotifyTrack) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group hover:bg-gray-900 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center flex-1">
                  <img
                    src={track.album.images[2]?.url}
                    alt={track.name}
                    className="w-12 h-12 object-cover"
                  />
                  <div className="ml-4 min-w-0">
                    <div className="text-white group-hover:text-green-500 transition-colors truncate">
                      {track.name}
                    </div>
                    <div className="text-gray-400 text-sm truncate">
                      {track.artists.map((a) => a.name).join(", ")} ·{" "}
                      {track.album.name}
                    </div>
                  </div>
                </div>
                <span className="text-gray-400 text-sm ml-4">
                  {formatDuration(track.duration_ms)}
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
