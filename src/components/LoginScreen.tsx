import React from "react";

// Spotify authentication constants
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

// Scopes for Spotify API access
const SCOPES = [
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
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(" "))}&response_type=code&show_dialog=true`;

const LoginScreen: React.FC = () => (
  <main className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-primary mb-5">Spotify Profile</h1>
    <a
      href={AUTH_URL}
      className="inline-block bg-green text-white rounded-full py-4 px-9 my-5 mb-[70px] min-w-[160px] font-bold tracking-wider uppercase text-center hover:bg-off-green focus:bg-off-green transition-colors"
    >
      Log in to Spotify
    </a>
  </main>
);

export default LoginScreen;
