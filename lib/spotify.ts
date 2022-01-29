export const authEndpoint = "https://accounts.spotify.com/authorize";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-follow-read",
  "user-modify-playback-state",
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-private",
  "user-library-read",
];

const params = {
  scope: scopes
}

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

export const setLocalAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("spotify_access_token", token);
  }
};

export const getLocalAccessToken = () => {
  if (typeof window !== "undefined") {
    let token = window.localStorage.getItem("spotify_access_token");
    return token;
  }
};

export const accessUrl = `${authEndpoint}?client_id=${process.env.CLIENT_ID
  }&redirect_uri=${process.env.REDIRECT_URI}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
