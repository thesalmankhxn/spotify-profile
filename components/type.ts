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
  
  