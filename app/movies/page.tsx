import { getTrendingMovies } from "@/lib/tmdb";
import MediaCard from "@/components/MediaCard";

export const metadata = { title: "Películas — CineTrack" };

export default async function MoviesPage() {
  const { results } = await getTrendingMovies();

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">🎬 Películas</h1>
      <p className="text-slate-500 text-sm mb-10">En tendencia esta semana</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {results.map((item) => (
          <MediaCard key={item.id} item={item} forceType="movie" />
        ))}
      </div>
    </div>
  );
}
