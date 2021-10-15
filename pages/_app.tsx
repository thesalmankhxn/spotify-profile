import React, { useEffect, useState } from "react";
import "../styles/globals.css";

import Layout from "../components/Layout";
import Login from "../components/Login";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromResponse } from "../components/spotify";

const spotify = new SpotifyWebApi();

type TokenHash = {
  access_token?: string;
  token_type?: string;
  expires_in?: string;
};

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    const hash: TokenHash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash?.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }
  }, []);

  console.log(token);

  return (
    <Layout>
      <Component {...pageProps} token={token} spotify={spotify} />
      {!token && <Login />}
    </Layout>
  );
}

export default MyApp;
