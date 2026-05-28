import { getMovieDetail } from "@/lib/tmdb";
import { IMG } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Calendar, ArrowLeft, DollarSign } from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";
import CastRow from "@/components/CastRow";
import TrendingRow from "@/components/TrendingRow";
import TrailerButton from "@/components/TrailerButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetail(id);
  return { title: `${movie.title} — CineTrack` };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieDetail(id);

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  const formatMoney = (n: number) =>
    n > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(n)
      : null;

  return (
    <div className="min-h-screen pb-16">
      {/* Backdrop */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={`${IMG}/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover object-top"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-[#0d0d14]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14]/60 to-transparent" />

        {/* Back button */}
        <Link
          href="/"
          className="absolute top-20 left-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg text-sm"
        >
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-32 relative z-10">
        <div className="grid md:grid-cols-[240px_1fr] gap-8 mb-12">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              {movie.poster_path ? (
                <Image
                  src={`${IMG}/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#1a1928]" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-end">
            {/* Genre tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs px-3 py-1 rounded-full bg-rose-600/15 border border-rose-500/30 text-rose-300"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-slate-400 text-lg italic mb-5">
                &ldquo;{movie.tagline}&rdquo;
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold text-base">
                <Star size={16} fill="currentColor" />
                {movie.vote_average.toFixed(1)}
                <span className="text-slate-500 text-xs font-normal">
                  ({movie.vote_count?.toLocaleString()} votos)
                </span>
              </span>
              {runtime && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock size={14} /> {runtime}
                </span>
              )}
              {movie.release_date && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar size={14} />
                  {new Date(movie.release_date).getFullYear()}
                </span>
              )}
              {director && (
                <span className="text-slate-400">
                  Dir.{" "}
                  <span className="text-white font-medium">{director.name}</span>
                </span>
              )}
            </div>

            {/* Overview */}
            <p className="text-slate-300 leading-relaxed text-base mb-8 max-w-2xl">
              {movie.overview || "Sin descripción disponible."}
            </p>

            {/* Budget / Revenue */}
            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="flex gap-6 mb-8">
                {movie.budget > 0 && (
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                      Presupuesto
                    </p>
                    <p className="text-white font-semibold">
                      {formatMoney(movie.budget)}
                    </p>
                  </div>
                )}
                {movie.revenue > 0 && (
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest mb-1">
                      Recaudación
                    </p>
                    <p className="text-white font-semibold">
                      {formatMoney(movie.revenue)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <TrailerButton mediaType="movie" id={movie.id} />
              <FavoriteButton
                item={{
                  id: movie.id,
                  media_type: "movie",
                  title: movie.title,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average,
                  date: movie.release_date,
                }}
                variant="outline"
              />
            </div>
          </div>
        </div>

        {/* Cast */}
        {movie.credits?.cast?.length > 0 && (
          <CastRow cast={movie.credits.cast} />
        )}

        {/* Similar */}
        {movie.similar?.results?.length > 0 && (
          <TrendingRow
            title="Películas similares"
            items={movie.similar.results}
            forceType="movie"
          />
        )}
      </div>
    </div>
  );
}
