export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "7894ed9dfe814c0f9c349d74ed147cab";
const redirectUri = "https://spotify-profile-lu4gunwch-iamsk77.vercel.app/";
// const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-follow-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = () => {
  if (!window.location.hash) return; 
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;