import { getTVDetail, IMG } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, ArrowLeft, Tv, Layers } from "lucide-react";
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
  const show = await getTVDetail(id);
  return { title: `${show.name} — CineTrack` };
}

export default async function TVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await getTVDetail(id);

  return (
    <div className="min-h-screen pb-16">
      {/* Backdrop */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        {show.backdrop_path && (
          <Image
            src={`${IMG}/original${show.backdrop_path}`}
            alt={show.name}
            fill
            className="object-cover object-top"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-[#0d0d14]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14]/60 to-transparent" />

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
              {show.poster_path ? (
                <Image
                  src={`${IMG}/w500${show.poster_path}`}
                  alt={show.name}
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
              <span className="text-xs px-3 py-1 rounded-full bg-blue-600/15 border border-blue-500/30 text-blue-300">
                📺 Serie
              </span>
              {show.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {show.name}
            </h1>
            {show.tagline && (
              <p className="text-slate-400 text-lg italic mb-5">
                &ldquo;{show.tagline}&rdquo;
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
              <span className="flex items-center gap-1.5 text-amber-400 font-semibold text-base">
                <Star size={16} fill="currentColor" />
                {show.vote_average.toFixed(1)}
                <span className="text-slate-500 text-xs font-normal">
                  ({show.vote_count?.toLocaleString()} votos)
                </span>
              </span>
              {show.first_air_date && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Calendar size={14} />
                  {new Date(show.first_air_date).getFullYear()}
                </span>
              )}
              {show.number_of_seasons > 0 && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Layers size={14} />
                  {show.number_of_seasons}{" "}
                  {show.number_of_seasons === 1 ? "temporada" : "temporadas"}
                </span>
              )}
              {show.number_of_episodes > 0 && (
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Tv size={14} />
                  {show.number_of_episodes} episodios
                </span>
              )}
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  show.status === "Returning Series"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                }`}
              >
                {show.status === "Returning Series"
                  ? "En emisión"
                  : show.status === "Ended"
                  ? "Finalizada"
                  : show.status}
              </span>
            </div>

            {/* Overview */}
            <p className="text-slate-300 leading-relaxed text-base mb-8 max-w-2xl">
              {show.overview || "Sin descripción disponible."}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <TrailerButton mediaType="tv" id={show.id} />
              <FavoriteButton
                item={{
                  id: show.id,
                  media_type: "tv",
                  title: show.name,
                  poster_path: show.poster_path,
                  vote_average: show.vote_average,
                  date: show.first_air_date,
                }}
                variant="outline"
              />
            </div>
          </div>
        </div>

        {/* Cast */}
        {show.credits?.cast?.length > 0 && (
          <CastRow cast={show.credits.cast} />
        )}

        {/* Similar */}
        {show.similar?.results?.length > 0 && (
          <TrendingRow
            title="Series similares"
            items={show.similar.results}
            forceType="tv"
          />
        )}
      </div>
    </div>
  );
}
