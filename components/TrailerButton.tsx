"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { IMG } from "@/lib/tmdb";

const KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;
const BASE = "https://api.themoviedb.org/3";

interface Props {
  mediaType: "movie" | "tv";
  id: number;
  label?: boolean;
}

export default function TrailerButton({ mediaType, id, label = true }: Props) {
  const [open, setOpen] = useState(false);
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (videoKey) {
      setOpen(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE}/${mediaType}/${id}/videos?api_key=${KEY}`
      );
      const data = await res.json();
      const trailer = (data.results as { key: string; type: string; site: string }[]).find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      ) || data.results[0];
      if (trailer) {
        setVideoKey(trailer.key);
        setOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm disabled:opacity-60"
      >
        <Play size={16} className={loading ? "animate-pulse" : ""} fill="currentColor" />
        {label && (loading ? "Cargando..." : "Ver Tráiler")}
      </motion.button>

      <AnimatePresence>
        {open && videoKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-2 text-sm"
              >
                <X size={18} /> Cerrar
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="w-full h-full rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
