import Link from "next/link";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import IconInfo from "./IconInfo";

export const Heading = styled.h2`
  ${tw`text-24p font-bold text-white `}
`;

export const Layout = styled.div`
  ${tw`py-30p px-25p h-full pb-80p`}

  @media (min-width: 768px) {
    ${tw`ml-80p p-80p`}
    padding-bottom: 0;
  }
`;

export const PlaylistName = styled.a`
  ${tw`mb-20p font-semibold cursor-pointer w-full inline text-white`}
  border-bottom: 1px solid transparent;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.3, 0, 0.4, 1) 0s;

  &:hover,
  &:focus {
    border-bottom: 1px solid white;
  }
`;

// TRACK ITEM
const TrackLeft = styled.span`
  ${tw`truncate`}
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
    fill: #fff;
  }
`;

const TrackContainer = styled.a`
  ${tw`flex mb-30p`}

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
  ${tw`flex justify-between w-full`}
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
  <div className="cursor-pointer">
    <Link href="">
      <TrackContainer>
        <div className="mr-20p">
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
            {track.name && <PlaylistName>{track.name}</PlaylistName>}
            {track.artists && track.album && (
              <TrackAlbum>
                {track.artists &&
                  track.artists.map(({ name }: any, i: React.Key) => (
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
      </TrackContainer>
    </Link>
  </div>
);
