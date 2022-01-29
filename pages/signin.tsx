import React from "react";

import tw from "twin.macro";
import styled from "styled-components";

import SpotifyLogo from "../public/Spotify-Logo.svg";

import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";

type propType = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

const Signin = ({ providers }: propType) => {
  return (
    <Styled.Layout>
      <SpotifyLogo
        height="300"
        className="mb-30p"
        style={{ width: "80%", maxWidth: "400px" }}
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Styled.Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Styled.Button>
        </div>
      ))}
    </Styled.Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const providers = await getProviders();
  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  return {
    props: {
      providers,
    },
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
