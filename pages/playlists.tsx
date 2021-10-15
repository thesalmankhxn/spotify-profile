import Link from "next/link";
import React from "react";

import styled from "styled-components";
import tw from "twin.macro";

import { Heading, Layout } from "../components/SharedComponents";

const Playlists = () => {
  return (
    <Layout>
      <Heading>Your Playlists</Heading>

      <Styled.Container></Styled.Container>
    </Layout>
  );
};

const PlaylistMask = styled.div`
  ${tw`text-white absolute w-full h-full inset-0 text-30p`}

  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1);
`;

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

  Playlist: styled.div`
    ${tw``}
  `,

  PlaylistImage: styled.img`
    object-fit: cover;
  `,
  PlaylistCover: styled(Link)`
    ${tw`mb-20p`}
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;
    width: 100%;
    &:hover,
    &:focus {
      ${PlaylistMask} {
        opacity: 1;
      }
    }
  `,
};

export default Playlists;
