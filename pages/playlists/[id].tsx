import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styled from "styled-components";
import tw from "twin.macro";

import { Layout, Heading } from "../../components/SharedComponents";
import MusicBars from "../../components/MusicBars";

import { Playlist } from "../../components/type";

const PlaylistDetail = ({ token, spotify }) => {
  const { query } = useRouter();

  const [playlist, setPlaylist] = useState<Playlist>(null);

  const getPlaylist = async () => {
    if (!token && query.id) return;
    spotify
      .getPlaylist(query.id)
      .then((playlist: Playlist) => setPlaylist(playlist));
  };

  useEffect(() => {
    const FetchUser = async () => {
      await getPlaylist();
    };
    FetchUser();
  }, [token]);

  console.log(playlist);

  return (
    <Layout>
      {playlist ? (
        <div>
          <Heading
            className="text-center mb-10p"
            style={{ fontSize: "26px", fontWeight: "700" }}
          >
            {playlist?.name}
          </Heading>
          <Styled.Owner>By {playlist?.owner?.display_name}</Styled.Owner>
          <p className="text-center my-20p text-white text-14p font-semibold">
            {playlist?.tracks?.total} Tracks
          </p>
          <Link href={`/recommendations/${playlist?.id}`}>
            <a className="flex flex-col justify-center">
              <Styled.RccmdtnBtn>GET RECOMMENDATIONS</Styled.RccmdtnBtn>
            </a>
          </Link>
        </div>
      ) : (
        <MusicBars />
      )}
    </Layout>
  );
};

const Styled = {
  Owner: styled.p`
    ${tw`text-14p text-grey77-light text-center mb-10p`}
  `,
  RccmdtnBtn: styled.button`
    ${tw`text-12p font-bold px-20p py-12p rounded-full bg-green77-light mx-auto my-20p`}
  `,
};

export default PlaylistDetail;
