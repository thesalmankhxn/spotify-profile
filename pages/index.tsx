import React, { useState, useContext } from "react";
import { getSession } from "next-auth/react";

import tw from "twin.macro";
import styled from "styled-components";
import AppContext from "../lib/context";

import Musicbars from "../components/MusicBars";
import IconUser from "../components/IconUser";
import Link from "next/link";
import { Card, Layout } from "../components/SharedComponents";

import { User, Playlists } from "../models/type";
import { GetServerSideProps } from "next";
import { getHeaders } from "../lib/spotify";

import spotifyApi from "../lib/spotify";

export default function Home({ user, followedArtists, playlists }) {
  // const [user, setUser] = useState<User>(_user);
  // const [followedArtists, setFollowedArtists] = useState(_followedArtists);
  // const [playlists, setPlaylists] = useState<Playlists>(_playlists);

  const { theme } = useContext(AppContext)?.value;

  return (
    <Layout>
      {!user && !followedArtists && !playlists ? (
        <Musicbars />
      ) : (
        <Card theme={theme}>
          <div className="flex flex-col items-center">
            <Styled.Avatar>
              {user?.images?.length > 0 ? (
                <img src={user?.images[0]?.url} className="rounded-full" />
              ) : (
                <IconUser />
              )}
            </Styled.Avatar>
            <Link href={user?.external_urls?.spotify ?? ""}>
              <a target="_blank" rel="noopener">
                <Styled.Name>{user?.display_name}</Styled.Name>
              </a>
            </Link>
            <Styled.TextLayout>
              <div className="text-center">
                <Styled.SGText>{user?.followers?.total}</Styled.SGText>
                <Styled.XSText>FOLLOWERS</Styled.XSText>
              </div>
              {followedArtists && (
                <div className="text-center">
                  <Styled.SGText>
                    {followedArtists?.artists?.items?.length}
                  </Styled.SGText>
                  <Styled.XSText>FOLLOWING</Styled.XSText>
                </div>
              )}
              {playlists && (
                <div className="text-center">
                  <Styled.SGText>{playlists?.items?.length}</Styled.SGText>
                  <Styled.XSText>PLAYLISTS</Styled.XSText>
                </div>
              )}
            </Styled.TextLayout>
          </div>
        </Card>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session || !session.user)
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };

  const headers = await getHeaders(ctx);

  // const user = await getUser(headers);

  const user = await spotifyApi.getMe().then((user) => user.body);
  const playlists = await spotifyApi
    .getUserPlaylists()
    .then((playlists) => playlists.body);

  const followedArtists = await spotifyApi
    .getFollowedArtists()
    .then((x) => x.body);
  console.log(followedArtists);
  return {
    props: {
      user: user,
      playlists: playlists,
      followedArtists: followedArtists,
    },
  };
};

const Styled = {
  Avatar: styled.div`
    ${tw`h-150p w-150p rounded-full mb-20p`}
  `,
  Name: styled.h2`
    ${tw`font-bold text-center hover:text-green77-light mb-20p`}
    --minFontSize: 20px;
    --maxFontSize: 50px;
    --scaler: 7vw;
    font-size: clamp(var(--minFontSize), var(--scaler), var(--maxFontSize));
  `,
  TextLayout: styled.div`
    ${tw`grid grid-cols-3 gap-x-30p`}
  `,
  SGText: styled.div`
    ${tw`text-green77-light text-20p font-semibold`}
  `,
  XSText: styled.div`
    ${tw`text-grey77-light text-12p font-semibold`}
    letter-spacing: 1px;
  `,
};
