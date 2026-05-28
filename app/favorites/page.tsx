"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Trash2, Film } from "lucide-react";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { IMG } from "@/lib/tmdb";
import type { FavoriteItem } from "@/types";

export default function FavoritesPage() {
  const [favs, setFavs] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavs(getFavorites());
  }, []);

  const remove = (item: FavoriteItem) => {
    toggleFavorite(item);
    setFavs(getFavorites());
    window.dispatchEvent(new Event("favorites-updated"));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <Heart size={28} className="text-rose-500" fill="currentColor" />
        <h1 className="text-3xl font-bold text-white">Mis Favoritos</h1>
        {favs.length > 0 && (
          <span className="ml-auto text-slate-500 text-sm">
            {favs.length} {favs.length === 1 ? "título" : "títulos"}
          </span>
        )}
      </div>

      {favs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-32 text-center"
        >
          <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6">
            <Heart size={36} className="text-rose-500/50" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Aún no tienes favoritos
          </h2>
          <p className="text-slate-500 mb-8">
            Pulsa el ❤️ en cualquier película o serie para guardarla aquí
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
          >
            <Film size={16} /> Explorar contenido
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
        >
          <AnimatePresence>
            {favs.map((item, i) => (
              <motion.div
                key={`${item.media_type}-${item.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                className="relative group"
              >
                <Link href={`/${item.media_type}/${item.id}`}>
                  <div className="aspect-[2/3] relative rounded-xl overflow-hidden bg-[#1a1928] border border-white/5 group-hover:border-white/15 transition-all">
                    {item.poster_path ? (
                      <Image
                        src={`${IMG}/w342${item.poster_path}`}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="176px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Film size={40} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Rating */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <Star size={10} className="text-amber-400" fill="currentColor" />
                      <span className="text-white text-xs font-bold">
                        {item.vote_average.toFixed(1)}
                      </span>
                    </div>

                    {/* Type */}
                    <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      item.media_type === "tv"
                        ? "bg-blue-600/80 text-white"
                        : "bg-rose-600/80 text-white"
                    }`}>
                      {item.media_type === "tv" ? "Serie" : "Peli"}
                    </div>
                  </div>
                </Link>

                {/* Remove button */}
                <button
                  onClick={() => remove(item)}
                  className="absolute top-10 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 bg-black/70 hover:bg-rose-600 text-white rounded-full flex items-center justify-center"
                >
                  <Trash2 size={12} />
                </button>

                <div className="mt-2 px-0.5">
                  <Link href={`/${item.media_type}/${item.id}`}>
                    <p className="text-white text-sm font-medium leading-tight line-clamp-2 hover:text-rose-400 transition-colors">
                      {item.title}
                    </p>
                  </Link>
                  {item.date && (
                    <p className="text-slate-500 text-xs mt-0.5">
                      {item.date.slice(0, 4)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
