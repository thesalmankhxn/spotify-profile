import { useQuery } from "@tanstack/react-query";
import { getTopArtists } from "../../api/spotify";
import OverlayLoader from "../OverlayLoader";

interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: {
    spotify: string;
  };
}

const Artists = () => {
  const { data: topArtists, isLoading } = useQuery({
    queryKey: ["topArtists"],
    queryFn: getTopArtists,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <OverlayLoader show={true} />;
  }

  return (
    <div className="py-10 px-5 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Top Artists</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topArtists?.items?.map((artist: SpotifyArtist) => (
          <a
            key={artist.id}
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="relative aspect-square mb-4">
              <img
                src={artist.images[0]?.url}
                alt={artist.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  View on Spotify
                </span>
              </div>
            </div>
            <h3 className="text-white group-hover:text-green-500 transition-colors text-base font-medium">
              {artist.name}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Artists;
