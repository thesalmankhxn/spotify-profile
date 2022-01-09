import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import Router from "next/router";

import { AppProvider } from "../lib/context";

import Layout from "../components/Layout";

import { getTokenFromResponse } from "../lib/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import cookie from "js-cookie";

const spotify = new SpotifyWebApi();

type TokenHash = {
  access_token?: string;
  token_type?: string;
  expires_in?: string;
};

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState<string>(cookie.get("auth_token"));
  spotify.setAccessToken(token || cookie.get("auth_token"));

  useEffect(() => {
    if (!token === null || !token === undefined) {
      Router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    if (!!cookie.get("auth_token")) return;
    const hash: TokenHash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash?.access_token;

    if (_token) {
      setToken(_token);
      cookie.set("auth_token", _token);
    }
  }, []);

  return (
    <AppProvider token={token} spotify={spotify} theme="dark">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

export default MyApp;
