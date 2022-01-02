import React, { useEffect, useState, useContext } from "react";

import tw from "twin.macro";
import styled from "styled-components";
import AppContext from "../lib/context";

import Musicbars from "../components/MusicBars";
import IconUser from "../components/IconUser";
import Link from "next/link";
import { Layout } from "../components/SharedComponents";

import { User, Playlists } from "../models/type";

export default function Home() {
  const [user, setUser] = useState<User>(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState<Playlists>(null);

  const { token, spotify } = useContext(AppContext)?.value;

  const getUser = async () => {
    if (!token) return;
    spotify.getMe().then((user: React.SetStateAction<User>) => setUser(user));
  };

  const getFollowedArtists = async () => {
    if (!token) return;
    spotify
      .getFollowedArtists()
      .then((artists: React.SetStateAction<User>) =>
        setFollowedArtists(artists)
      );
  };

  const getPlaylists = async () => {
    if (!token) return;
    spotify
      .getUserPlaylists()
      .then((playlists: React.SetStateAction<Playlists>) =>
        setPlaylists(playlists)
      );
  };

  useEffect(() => {
    const FetchUser = async () => {
      await getUser();
      await getFollowedArtists();
      await getPlaylists();
    };
    FetchUser();
  }, [token]);

  return (
    <Layout>
      {!user && !followedArtists && !playlists ? (
        <Musicbars />
      ) : (
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
      )}
    </Layout>
  );
}

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
