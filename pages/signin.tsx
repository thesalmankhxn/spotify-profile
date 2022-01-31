import React from "react";

import tw from "twin.macro";
import styled from "styled-components";

import SpotifyLogo from "../public/Spotify-Logo.svg";

import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

const Signin = () => {
  return (
    <Styled.Layout>
      <SpotifyLogo
        height="300"
        className="mb-30p"
        style={{ width: "80%", maxWidth: "400px" }}
      />

      <Styled.Button onClick={() => signIn("spotify")}>
        Sign in with Spotify
      </Styled.Button>
    </Styled.Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const session = await getSession({ req });
  if (session && session?.user)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {},
  };
};

const Styled = {
  Layout: styled.div`
    ${tw`fixed bg-black inset-0 grid place-items-center`}
    height: 100vh;
    width: 100vw;
    z-index: 99;
  `,
  Button: styled.button`
    ${tw`px-20p py-12p rounded-full font-semibold`}
    background: #1DB954;
  `,
};

export default Signin;
