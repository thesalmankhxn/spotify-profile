// Spotify API constants
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

// Scopes for Spotify API access
export const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
];

// Construct Spotify authorization URL
export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(" "))}&response_type=code&show_dialog=true`;

// Exchange authorization code for access token
export const getAccessToken = async (code: string) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  const data = await response.json();
  return data;
};

// Refresh the access token
export const refreshAccessToken = async (refreshToken: string) => {
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
  return data;
};

// Get user profile
export const getUserProfile = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

// Get user's following count
export const getUserFollowing = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/following?type=artist",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user following");
  }

  return response.json();
};

// Get user's playlists count
export const getUserPlaylists = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user playlists");
  }

  return response.json();
};

// Get user's top artists
export const getTopArtists = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=7",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top artists");
  }

  return response.json();
};

// Get user's top tracks
export const getTopTracks = async () => {
  const accessToken = localStorage.getItem("spotify_access_token");

  if (!accessToken) {
    throw new Error("No access token available");
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=7",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch top tracks");
  }

  return response.json();
};
