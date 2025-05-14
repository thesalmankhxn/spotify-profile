import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Function to fetch user profile from Spotify API
const fetchUserProfile = async () => {
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

const Profile = () => {
  const navigate = useNavigate();

  // Use React Query to fetch user profile
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
  });

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");
    navigate("/");
    // Force a reload to clear all React Query cache
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Error loading profile</p>
      </div>
    );
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
