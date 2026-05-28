const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE = "https://api.themoviedb.org/3";
export const IMG = "https://image.tmdb.org/t/p";

async function get<T>(path: string, params = ""): Promise<T> {
  const res = await fetch(`${BASE}${path}?api_key=${KEY}${params}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export const getTrendingMovies = () =>
  get<{ results: import("@/types").MediaItem[] }>("/trending/movie/week");

export const getTrendingTV = () =>
  get<{ results: import("@/types").MediaItem[] }>("/trending/tv/week");

export const getTrendingAll = () =>
  get<{ results: import("@/types").MediaItem[] }>("/trending/all/week");

export const getMovieDetail = (id: string) =>
  get<import("@/types").MovieDetail>(
    `/movie/${id}`,
    "&append_to_response=credits,videos,similar"
  );

export const getTVDetail = (id: string) =>
  get<import("@/types").TVDetail>(
    `/tv/${id}`,
    "&append_to_response=credits,videos,similar"
  );

export const searchMulti = (q: string, page = 1) =>
  get<{ results: import("@/types").MediaItem[]; total_results: number }>(
    "/search/multi",
    `&query=${encodeURIComponent(q)}&page=${page}`
  );
