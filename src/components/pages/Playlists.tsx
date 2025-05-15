import { useQuery } from "@tanstack/react-query";
import { getUserPlaylists } from "../../api/spotify";
import OverlayLoader from "../OverlayLoader";

interface SpotifyPlaylist {
  id: string;
  name: string;
  images: { url: string }[];
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
}

const Playlists = () => {
  const { data: playlists, isLoading } = useQuery({
    queryKey: ["userPlaylists"],
    queryFn: getUserPlaylists,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <OverlayLoader show={true} />;
  }

  return (
    <div className="py-10 px-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Your Playlists</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists?.items?.map((playlist: SpotifyPlaylist) => (
          <a
            key={playlist.id}
            href={playlist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="relative aspect-square mb-4">
              <img
                src={playlist.images[0]?.url}
                alt={playlist.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  View on Spotify
                </span>
              </div>
            </div>
            <h3 className="text-white group-hover:text-green-500 transition-colors text-base font-medium truncate">
              {playlist.name}
            </h3>
            <p className="text-gray-400 text-sm truncate">
              By {playlist.owner.display_name} • {playlist.tracks.total} tracks
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
