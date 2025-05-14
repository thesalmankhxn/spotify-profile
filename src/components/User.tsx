import React, { useState } from "react";
import { IconUser, IconInfo } from "./icons";
import Loader from "./icons/loader";
import { Link } from "react-router-dom";
import TrackItem from "./TrackItem";

interface SpotifyImage {
  url: string;
}

interface SpotifyUser {
  display_name: string;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
}

interface SpotifyArtist {
  id: string;
  name: string;
  images: SpotifyImage[];
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: {
    images: SpotifyImage[];
  };
  duration_ms: number;
}

interface SpotifyPlaylist {
  total: number;
}

interface SpotifyFollowedArtists {
  artists: {
    items: SpotifyArtist[];
  };
}

const User: React.FC = () => {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [followedArtists, setFollowedArtists] =
    useState<SpotifyFollowedArtists | null>(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist | null>(null);
  const [topArtists, setTopArtists] = useState<{
    items: SpotifyArtist[];
  } | null>(null);
  const [topTracks, setTopTracks] = useState<{ items: SpotifyTrack[] } | null>(
    null
  );

  const totalPlaylists = playlists ? playlists.total : 0;

  return (
    <React.Fragment>
      {user ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex flex-col items-center relative">
            <div className="w-[150px] h-[150px]">
              {user.images.length > 0 ? (
                <img
                  src={user.images[0].url}
                  alt="avatar"
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <div className="border-2 border-current rounded-full p-4 w-full h-full flex items-center justify-center">
                  <IconUser />
                </div>
              )}
            </div>
            <a
              href={user.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-off-green focus:text-off-green transition-colors"
            >
              <h1 className="text-5xl font-bold mt-5 mb-0 text-center sm:text-4xl md:text-5xl">
                {user.display_name}
              </h1>
            </a>
            <div className="grid grid-cols-3 gap-8 mt-4">
              <div className="text-center">
                <div className="text-green font-bold text-lg">
                  {user.followers.total}
                </div>
                <p className="text-light-grey text-xs uppercase tracking-wider mt-1">
                  Followers
                </p>
              </div>
              {followedArtists && (
                <div className="text-center">
                  <div className="text-green font-bold text-lg">
                    {followedArtists.artists.items.length}
                  </div>
                  <p className="text-light-grey text-xs uppercase tracking-wider mt-1">
                    Following
                  </p>
                </div>
              )}
              {totalPlaylists && (
                <div className="text-center">
                  <Link to="playlists" className="block">
                    <div className="text-green font-bold text-lg">
                      {totalPlaylists}
                    </div>
                    <p className="text-light-grey text-xs uppercase tracking-wider mt-1">
                      Playlists
                    </p>
                  </Link>
                </div>
              )}
            </div>
            <button
              onClick={() => {}}
              className="bg-transparent text-white border border-white rounded-full mt-8 px-8 py-3 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
            >
              Logout
            </button>
          </header>

          <section className="grid grid-cols-2 gap-16 w-full mt-24 md:grid-cols-1 md:mt-16">
            <div className="md:mb-12">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold m-0">
                  Top Artists of All Time
                </h3>
                <Link
                  to="/artists"
                  className="bg-green text-white rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-off-green transition-colors"
                >
                  See More
                </Link>
              </div>
              <div>
                {topArtists ? (
                  <ul>
                    {topArtists.items.slice(0, 10).map((artist, i) => (
                      <li key={i} className="flex items-center mb-4">
                        <Link
                          to={`/artist/${artist.id}`}
                          className="relative inline-block w-12 h-12 mr-4"
                        >
                          {artist.images.length > 0 && (
                            <img
                              src={artist.images[2].url}
                              alt="Artist"
                              className="w-12 h-12 rounded-full"
                            />
                          )}
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                            <IconInfo className="w-6 h-6 text-white" />
                          </div>
                        </Link>
                        <Link
                          to={`/artist/${artist.id}`}
                          className="flex-grow hover:border-b hover:border-white"
                        >
                          <span>{artist.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Loader />
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-bold m-0">
                  Top Tracks of All Time
                </h3>
                <Link
                  to="/tracks"
                  className="bg-green text-white rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-off-green transition-colors"
                >
                  See More
                </Link>
              </div>
              <ul>
                {topTracks ? (
                  topTracks.items
                    .slice(0, 10)
                    .map((track, i) => <TrackItem track={track} key={i} />)
                ) : (
                  <Loader />
                )}
              </ul>
            </div>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
};

export default User;
