import Link from "next/link";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import tw from "twin.macro";
import IconMusic from "../../components/IconMusic";

import MusicBars from "../../components/MusicBars";
import { Heading, Layout } from "../../components/SharedComponents";

import { Playlists as IPlaylists } from "../../components/type";

const Playlists = ({ token, spotify }) => {
  const [playlists, setPlaylists] = useState<IPlaylists>(null);

  const getPlaylists = async () => {
    if (!token) return;
    spotify
      .getUserPlaylists()
      .then((playlists: React.SetStateAction<IPlaylists>) =>
        setPlaylists(playlists)
      );
  };

  useEffect(() => {
    const FetchUser = async () => {
      await getPlaylists();
    };
    FetchUser();
  }, [token]);

  return (
    <Layout>
      <Styled.FluidContainer>
        <Heading>Your Playlists</Heading>

        <Styled.Container>
          {playlists ? (
            playlists?.items?.map((playlist, i) => (
              <div key={i}>
                <Styled.Playlist>
                  <Styled.PlaylistCover href={`playlists/${playlist?.id}`}>
                    <a>
                      {playlist?.images?.length ? (
                        <Styled.PlaylistImage
                          src={playlist?.images?.[0]?.url}
                          alt="Album Art"
                        />
                      ) : (
                        <PlaceholderArtwork>
                          <PlaceholderContent>
                            <IconMusic />
                          </PlaceholderContent>
                        </PlaceholderArtwork>
                      )}
                    </a>
                  </Styled.PlaylistCover>
                </Styled.Playlist>
                <div className="text-center">
                  <Link href={`playlists/${playlist?.id}`}>
                    <Styled.PlaylistName>{playlist?.name}</Styled.PlaylistName>
                  </Link>
                  <Styled.TotalTracks>
                    {playlist?.tracks?.total} Tracks
                  </Styled.TotalTracks>
                </div>
              </div>
            ))
          ) : (
            <MusicBars />
          )}
        </Styled.Container>
      </Styled.FluidContainer>
    </Layout>
  );
};

const Styled = {
  Container: styled.div`
    ${tw`grid gap-30p mt-50p`}
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

    width: 100%;
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }

    @media (max-width: 500px) {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  `,

  FluidContainer: styled.div`
    @media (min-width: 768px) {
      ${tw`px-80p`}
    }
  `,

  Playlist: styled.div`
    ${tw`mb-20p`}
    box-shadow: rgb(0 0 0 / 30%) 0px 0px 10px;
  `,

  PlaylistImage: styled.img`
    object-fit: cover;
  `,
  PlaylistCover: styled(Link)`
    ${tw`mb-20p`}
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    width: 100%;
  `,
  PlaylistName: styled.a`
    ${tw`mb-20p font-semibold cursor-pointer w-full inline text-white`}
    border-bottom: 1px solid transparent;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s;

    &:hover,
    &:focus {
      border-bottom: 1px solid white;
    }
  `,

  TotalTracks: styled.div`
    ${tw`text-grey77-light text-12p font-semibold`}
    text-transform: uppercase;
    margin: 5px 0;
    letter-spacing: 1px;
  `,
};

const PlaceholderArtwork = styled.div`
  ${tw`relative w-full flex justify-center items-center`}
  padding-bottom: 100%;
  background-color: rgba(0, 0, 0, 0.473);
  svg {
    width: 100px;
    height: 100px;
  }
`;
const PlaceholderContent = styled.div`
  ${tw`flex justify-center items-center absolute inset-0`}
`;

export default Playlists;
