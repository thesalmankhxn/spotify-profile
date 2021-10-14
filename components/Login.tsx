import React, { useEffect, useState } from "react";

import tw from "twin.macro";
import styled from "styled-components";

import SpotifyLogo from "../public/Spotify-Logo.svg";
import { accessUrl, getTokenFromResponse } from "./spotify";

const Login = () => {
  const [token, setToken] = useState({});
  useEffect(() => {
    const _token = getTokenFromResponse();
    setToken(_token);
  }, []);

  return (
    <>
      {!token && (
        <Styled.Layout>
          <SpotifyLogo width="400" height="300" className="mb-30p" />
          <Styled.Link href={accessUrl}>Login with Spotify</Styled.Link>
        </Styled.Layout>
      )}
    </>
  );
};

const Styled = {
  Layout: styled.div`
    ${tw`z-10 fixed bg-black inset-0 grid place-items-center`}
  `,
  Link: styled.a`
    ${tw`px-20p py-12p rounded-full font-semibold`}
    background: #1DB954;
  `,
};

export default Login;
