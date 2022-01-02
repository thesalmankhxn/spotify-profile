import React, { useEffect, useState } from "react";
import "../styles/globals.css";

import { AppProvider } from "../lib/context";

import Layout from "../components/Layout";
import Login from "../components/Login";

import { getTokenFromResponse } from "../lib/spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

type TokenHash = {
  access_token?: string;
  token_type?: string;
  expires_in?: string;
};

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    if (token) return;

    const hash: TokenHash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash?.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
    }
  }, []);

  return (
    <Layout>
      <AppProvider token={token} spotify={spotify}>
        {!token ? <Login /> : <Component {...pageProps} />}
      </AppProvider>
    </Layout>
  );
}

export default MyApp;
