import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// Constants
const CLIENT_ID = "6c97a4c0578d4b309084733e6912d02f";
const CLIENT_SECRET = "f6ba014afb1b42a79038c5949c06699b";
const REDIRECT_URI = "http://localhost:5173/callback";

const Callback = ({
  setAccessToken,
}: {
  setAccessToken: (token: string) => void;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const getAccessToken = async () => {
      // Get the authorization code from URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          // Exchange authorization code for access token
          const tokenResponse = await fetch(
            "https://accounts.spotify.com/api/token",
            {
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
            }
          );

          if (!tokenResponse.ok) {
            throw new Error("Failed to get access token");
          }

          const data = await tokenResponse.json();

          // Save access token to localStorage
          localStorage.setItem("spotify_access_token", data.access_token);

          // Set the access token in the parent component
          setAccessToken(data.access_token);

          // Store refresh token for later use if needed
          localStorage.setItem("spotify_refresh_token", data.refresh_token);

          // Save token expiration time
          const expiresIn = data.expires_in;
          const expirationTime = new Date().getTime() + expiresIn * 1000;
          localStorage.setItem(
            "spotify_token_expiration",
            expirationTime.toString()
          );

          // Clear all queries to ensure fresh data
          queryClient.invalidateQueries();

          // Redirect to profile page
          navigate("/");
        } catch (error) {
          console.error("Error getting access token:", error);
          navigate("/");
        }
      } else {
        // If there's no code in the URL, redirect to login
        navigate("/");
      }
    };

    getAccessToken();
  }, [navigate, setAccessToken, queryClient]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl">Logging you in...</p>
    </div>
  );
};

export default Callback;
