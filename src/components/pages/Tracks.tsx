import { useQuery } from "@tanstack/react-query";
import { getTopTracks } from "../../api/spotify";
import OverlayLoader from "../OverlayLoader";

interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  artists: {
    name: string;
  }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

const Tracks = () => {
  const { data: topTracks, isLoading } = useQuery({
    queryKey: ["topTracks"],
    queryFn: getTopTracks,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <OverlayLoader show={true} />;
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="py-10 px-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Top Tracks</h1>
      <div className="space-y-4">
        {topTracks?.items?.map((track: SpotifyTrack) => (
          <a
            key={track.id}
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group hover:bg-gray-900 p-4 rounded-lg transition-colors"
          >
            <div className="flex items-center flex-1">
              <img
                src={track.album.images[2]?.url}
                alt={track.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 min-w-0">
                <div className="text-white group-hover:text-green-500 transition-colors text-lg font-medium truncate">
                  {track.name}
                </div>
                <div className="text-gray-400 text-sm truncate">
                  {track.artists.map((a) => a.name).join(", ")} ·{" "}
                  {track.album.name}
                </div>
              </div>
            </div>
            <span className="text-gray-400 text-sm ml-4">
              {formatDuration(track.duration_ms)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tracks;
