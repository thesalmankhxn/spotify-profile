export interface User {
    display_name: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images?: (ImagesEntity)[] | null;
    type: string;
    uri: string;
  };
  export interface ExternalUrls {
    spotify: string;
  };
  export interface Followers {
    href: string;
    total: number;
  };
  export interface ImagesEntity {
    height: string;
    url: string;
    width: string;
  };

  export interface Playlists {
    href: string;
    items?: (ItemsEntity)[] | null;
    limit: number;
    next?: null;
    offset: number;
    previous?: null;
    total: number;
  };
  export interface ItemsEntity {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images?: (ImagesEntity)[] | null;
    name: string;
    owner: Owner;
    primary_color?: null;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
  };
  export interface ExternalUrls {
    spotify: string;
  };
  export interface Owner {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  export interface Tracks {
    href: string;
    total: number;
  };
  
  export interface Playlist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images?: (ImagesEntity)[] | null;
    name: string;
    owner: Owner;
    primary_color?: null;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
  }
  export interface ExternalUrls {
    spotify: string;
  }
  export interface Owner {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }
  export interface Tracks {
    href: string;
    items?: (ItemsEntity)[] | null;
    limit: number;
    next?: null;
    offset: number;
    previous?: null;
    total: number;
  }
  export interface ItemsEntity {
    added_at: string;
    added_by: AddedBy;
    is_local: boolean;
    primary_color?: null;
    track: Track;
    video_thumbnail: VideoThumbnail;
  }
  export interface AddedBy {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }
  export interface Track {
    album: Album;
    artists?: (ArtistsEntity)[] | null;
    available_markets?: (string)[] | null;
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url?: string | null;
    track: boolean;
    track_number: number;
    type: string;
    uri: string;
  }
  export interface Album {
    album_type: string;
    artists?: (ArtistsEntity)[] | null;
    available_markets?: (string)[] | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images?: (ImagesEntity)[] | null;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  export interface ArtistsEntity {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  export interface ExternalIds {
    isrc: string;
  }
  export interface VideoThumbnail {
    url?: null;
  }
  
  