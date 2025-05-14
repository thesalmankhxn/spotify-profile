import React from "react";
import { Link } from "react-router-dom";
import { IconInfo } from "./icons";

// Basic formatDuration utility function
const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

interface Artist {
  name: string;
}

interface Album {
  images: Array<{
    url: string;
  }>;
  name?: string;
}

interface Track {
  id: string;
  name: string;
  duration_ms: number;
  artists: Artist[];
  album: Album;
}

interface TrackItemProps {
  track: Track;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  return (
    <li>
      <Link
        to={`/track/${track.id}`}
        className="grid grid-cols-[auto_1fr] items-center mb-4 hover:opacity-100 focus:opacity-100"
      >
        <div>
          <div className="inline-block relative w-[50px] min-w-[50px] mr-4">
            {track.album.images.length > 0 && (
              <img
                src={track.album.images[2].url}
                alt="Album Artwork"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <IconInfo className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_max-content] gap-2.5">
          <div className="truncate">
            {track.name && (
              <span className="block mb-1 border-b border-transparent hover:border-white focus:border-white">
                {track.name}
              </span>
            )}
            {track.artists && track.album && (
              <div className="truncate text-gray-400 text-sm mt-0.5">
                {track.artists.map(({ name }, i) => (
                  <span key={i}>
                    {name}
                    {track.artists.length > 0 && i === track.artists.length - 1
                      ? ""
                      : ","}
                    &nbsp;
                  </span>
                ))}
                &nbsp;&middot;&nbsp;&nbsp;
                {track.album.name}
              </div>
            )}
          </div>
          <div>
            {track.duration_ms && (
              <span className="text-gray-400 text-sm">
                {formatDuration(track.duration_ms)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TrackItem;
