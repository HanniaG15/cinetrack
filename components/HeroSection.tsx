"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { IMG } from "@/lib/tmdb";
import type { MediaItem, MediaType } from "@/types";
import FavoriteButton from "./FavoriteButton";
import TrailerButton from "./TrailerButton";

export default function HeroSection({ items }: { items: MediaItem[] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % items.length),
    [items.length]
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + items.length) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [next, paused]);

  const item = items[current];
  const mediaType: MediaType = item.media_type === "tv" ? "tv" : "movie";
  const title = item.title || item.name || "";
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const href = `/${mediaType}/${item.id}`;

  return (
    <div
      className="relative h-[88vh] min-h-[580px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {item.backdrop_path && (
            <Image
              src={`${IMG}/original${item.backdrop_path}`}
              alt={title}
              fill
              className="object-cover object-top"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d14] via-[#0d0d14]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/10 to-[#0d0d14]/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
                    mediaType === "movie"
                      ? "text-rose-400 bg-rose-500/10 border-rose-500/30"
                      : "text-blue-400 bg-blue-500/10 border-blue-500/30"
                  }`}
                >
                  {mediaType === "movie" ? "🎬 Película" : "📺 Serie"}
                </span>
                <span className="flex items-center gap-1.5 text-amber-400 text-sm font-semibold">
                  <Star size={14} fill="currentColor" />
                  {item.vote_average.toFixed(1)}
                </span>
                {year && (
                  <span className="text-slate-400 text-sm">{year}</span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                {title}
              </h1>

              {/* Overview */}
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 line-clamp-3">
                {item.overview || "Sin descripción disponible."}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={href}
                  className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-rose-900/40"
                >
                  <Info size={17} />
                  Ver Detalles
                </Link>
                <TrailerButton mediaType={mediaType} id={item.id} />
                <FavoriteButton
                  item={{
                    id: item.id,
                    media_type: mediaType,
                    title,
                    poster_path: item.poster_path,
                    vote_average: item.vote_average,
                    date: item.release_date || item.first_air_date,
                  }}
                  variant="outline"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-rose-500"
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
