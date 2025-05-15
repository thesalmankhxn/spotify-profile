import { useQuery } from "@tanstack/react-query";
import { getRecentlyPlayed } from "../../api/spotify";
import OverlayLoader from "../OverlayLoader";

interface SpotifyTrack {
  track: {
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
  };
  played_at: string;
}

const Recent = () => {
  const { data: recentTracks, isLoading } = useQuery({
    queryKey: ["recentTracks"],
    queryFn: getRecentlyPlayed,
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

  const formatPlayedAt = (date: string) => {
    const now = new Date();
    const played = new Date(date);
    const diff = now.getTime() - played.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="py-10 px-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Recently Played</h1>
      <div className="space-y-4">
        {recentTracks?.items?.map((item: SpotifyTrack) => (
          <a
            key={`${item.track.id}-${item.played_at}`}
            href={item.track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group hover:bg-gray-900 p-4 rounded-lg transition-colors"
          >
            <div className="flex items-center flex-1">
              <img
                src={item.track.album.images[2]?.url}
                alt={item.track.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 min-w-0">
                <div className="text-white group-hover:text-green-500 transition-colors text-lg font-medium truncate">
                  {item.track.name}
                </div>
                <div className="text-gray-400 text-sm truncate">
                  {item.track.artists.map((a) => a.name).join(", ")} ·{" "}
                  {item.track.album.name}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  {formatPlayedAt(item.played_at)}
                </div>
              </div>
            </div>
            <span className="text-gray-400 text-sm ml-4">
              {formatDuration(item.track.duration_ms)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Recent;
