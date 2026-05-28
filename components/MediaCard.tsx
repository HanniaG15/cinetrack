"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clapperboard, Tv } from "lucide-react";
import { IMG } from "@/lib/tmdb";
import type { MediaItem, MediaType } from "@/types";
import FavoriteButton from "./FavoriteButton";

interface Props {
  item: MediaItem;
  forceType?: MediaType;
}

export default function MediaCard({ item, forceType }: Props) {
  const mediaType: MediaType =
    forceType ?? (item.media_type === "tv" ? "tv" : "movie");
  const title = item.title || item.name || "Sin título";
  const year = (item.release_date || item.first_air_date || "").slice(0, 4);
  const href = `/${mediaType}/${item.id}`;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="relative group rounded-xl overflow-hidden shrink-0 w-40 sm:w-44 cursor-pointer"
    >
      <Link href={href}>
        <div className="aspect-[2/3] relative bg-[#1a1928] rounded-xl overflow-hidden">
          {item.poster_path ? (
            <Image
              src={`${IMG}/w342${item.poster_path}`}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="176px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              {mediaType === "tv" ? (
                <Tv size={40} />
              ) : (
                <Clapperboard size={40} />
              )}
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

          {/* Rating badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
            <Star size={10} className="text-amber-400" fill="currentColor" />
            <span className="text-white text-xs font-bold">
              {item.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Type badge */}
          <div
            className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${
              mediaType === "tv"
                ? "bg-blue-600/80 text-white"
                : "bg-rose-600/80 text-white"
            }`}
          >
            {mediaType === "tv" ? "Serie" : "Peli"}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-2 px-0.5">
        <Link href={href}>
          <p className="text-white text-sm font-medium leading-tight line-clamp-2 hover:text-rose-400 transition-colors">
            {title}
          </p>
        </Link>
        {year && <p className="text-slate-500 text-xs mt-0.5">{year}</p>}
      </div>

      {/* Favorite button */}
      <div className="absolute top-10 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <FavoriteButton
          item={{
            id: item.id,
            media_type: mediaType,
            title,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            date: item.release_date || item.first_air_date,
          }}
          size="sm"
        />
      </div>
    </motion.div>
  );
}
