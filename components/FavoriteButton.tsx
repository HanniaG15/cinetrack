"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { isFavorite, toggleFavorite } from "@/lib/favorites";
import type { FavoriteItem } from "@/types";

interface Props {
  item: FavoriteItem;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline";
}

export default function FavoriteButton({
  item,
  size = "md",
  variant = "solid",
}: Props) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(item.id, item.media_type));
  }, [item.id, item.media_type]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleFavorite(item);
    setFav(next);
    window.dispatchEvent(new Event("favorites-updated"));
  };

  const iconSize = size === "sm" ? 14 : size === "lg" ? 22 : 18;

  if (variant === "outline") {
    return (
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold transition-all text-sm ${
          fav
            ? "bg-rose-600/20 border-rose-500/50 text-rose-400"
            : "bg-white/5 border-white/15 text-slate-300 hover:border-rose-500/40 hover:text-rose-400"
        }`}
      >
        <Heart
          size={iconSize}
          className={fav ? "fill-rose-500 text-rose-500" : ""}
        />
        {fav ? "En favoritos" : "Añadir a favoritos"}
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`rounded-full flex items-center justify-center transition-all ${
        size === "sm" ? "w-7 h-7" : size === "lg" ? "w-11 h-11" : "w-9 h-9"
      } ${
        fav
          ? "bg-rose-600 text-white"
          : "bg-black/60 backdrop-blur-sm text-white/70 hover:bg-rose-600/50 hover:text-white"
      }`}
    >
      <Heart
        size={iconSize}
        className={fav ? "fill-white" : ""}
      />
    </motion.button>
  );
}
