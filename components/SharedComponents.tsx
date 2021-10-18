import Link from "next/link";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IconInfo from "./IconInfo";

export const Heading = styled.h2`
  ${tw`text-24p font-bold text-white `}
`;

export const Layout = styled.div`
  ${tw`py-30p px-25p h-full overflow-auto pb-80p`}

  @media (min-width: 768px) {
    ${tw`ml-80p p-80p`}
    padding-bottom: 0;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    background-image: linear-gradient(315deg, #ffffff 0%, #fafafa 74%);
    border-radius: 10px;

    &:hover {
      background-color: #ffffff;
      background-image: linear-gradient(315deg, #e9e9e9 0%, #ececec 74%);
    }
  }

  ::-webkit-scrollbar-track {
    background: #000000;
  }

  scrollbar-width: thin;
  scrollbar-color: #ffffff #000000;
`;

// TRACK ITEM
const TrackLeft = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;
`;
const TrackRight = styled.span``;
const TrackArtwork = styled.div`
  ${tw`mb-20p inline-block relative`}
  width: 50px;
  min-width: 50px;
`;

const Mask = styled.div`
  ${tw`flex justify-center items-center absolute inset-0 text-white`}
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1);
  svg {
    width: 25px;
  }
`;

const TrackContainer = styled(Link)`
  ${tw`grid items-center mb-30p`}
  grid-template-columns: auto 1fr;

  @media (min-width: 768px) {
    ${tw`mb-20p`}
  }

  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;

const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;
const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid #fff;
  }
`;
const TrackAlbum = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 1px;

  ${tw`text-14p`}
  color: '#b3b3b3';
  margin-top: 3px;
`;
const TrackDuration = styled.span`
  ${tw`text-14p`}
  color: '#b3b3b3';
`;

// Format milliseconds into MM:SS
export const formatDuration = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${
    (seconds as unknown as number) < 10 ? "0" : ""
  }${seconds}`;
};

export const TrackItem = ({ track }) => (
  <li>
    <TrackContainer href="">
      <a>
        <div>
          <TrackArtwork>
            {track.album.images.length && (
              <img src={track.album.images[2].url} alt="Album Artwork" />
            )}
            <Mask>
              <IconInfo />
            </Mask>
          </TrackArtwork>
        </div>
        <TrackMeta>
          <TrackLeft>
            {track.name && <TrackName>{track.name}</TrackName>}
            {track.artists && track.album && (
              <TrackAlbum>
                {track.artists &&
                  track.artists.map(({ name }, i) => (
                    <span key={i}>
                      {name}
                      {track.artists.length > 0 &&
                      i === track.artists.length - 1
                        ? ""
                        : ","}
                      &nbsp;
                    </span>
                  ))}
                &nbsp;&middot;&nbsp;&nbsp;
                {track.album.name}
              </TrackAlbum>
            )}
          </TrackLeft>
          <TrackRight>
            {track.duration_ms && (
              <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>
            )}
          </TrackRight>
        </TrackMeta>
      </a>
    </TrackContainer>
  </li>
);
