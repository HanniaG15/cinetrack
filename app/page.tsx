import { getTrendingAll, getTrendingMovies, getTrendingTV } from "@/lib/tmdb";
import HeroSection from "@/components/HeroSection";
import TrendingRow from "@/components/TrendingRow";

export default async function Home() {
  const [all, movies, tv] = await Promise.all([
    getTrendingAll(),
    getTrendingMovies(),
    getTrendingTV(),
  ]);

  const heroItems = all.results
    .filter((i) => i.backdrop_path && i.overview && i.media_type !== "person")
    .slice(0, 7);

  return (
    <div>
      <HeroSection items={heroItems} />
      <div className="pt-10">
        <TrendingRow
          title="🔥 Películas en Tendencia"
          items={movies.results}
          forceType="movie"
          viewAllHref="/movies"
        />
        <TrendingRow
          title="📺 Series en Tendencia"
          items={tv.results}
          forceType="tv"
          viewAllHref="/shows"
        />
        <TrendingRow
          title="⭐ Lo más popular"
          items={all.results.filter((i) => i.media_type !== "person")}
        />
      </div>
    </div>
  );
}
