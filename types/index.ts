export type MediaType = "movie" | "tv";

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  media_type: MediaType | "person";
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  type: string;
  site: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
  status: string;
  budget: number;
  revenue: number;
  credits: { cast: CastMember[]; crew: CrewMember[] };
  videos: { results: Video[] };
  similar: { results: MediaItem[] };
}

export interface TVDetail {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  episode_run_time: number[];
  genres: Genre[];
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  credits: { cast: CastMember[] };
  videos: { results: Video[] };
  similar: { results: MediaItem[] };
}

export interface FavoriteItem {
  id: number;
  media_type: MediaType;
  title: string;
  poster_path: string | null;
  vote_average: number;
  date?: string;
}
