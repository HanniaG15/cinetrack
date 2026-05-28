"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { searchMulti } from "@/lib/tmdb";
import MediaCard from "@/components/MediaCard";
import type { MediaItem } from "@/types";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [results, setResults] = useState<MediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    try {
      const data = await searchMulti(q);
      setResults(data.results.filter((i) => i.media_type !== "person"));
      setTotal(data.total_results);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ) doSearch(initialQ);
  }, [initialQ, doSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      doSearch(query);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 sm:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Buscar</h1>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="relative mb-10 max-w-2xl">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas, series..."
          className="w-full bg-[#1a1928] border border-white/10 text-white placeholder-slate-500 text-base rounded-xl pl-12 pr-12 py-3.5 outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/20 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setResults([]);
              setSearched(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </form>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-rose-500" />
        </div>
      )}

      {/* Results */}
      {!loading && searched && (
        <>
          <p className="text-slate-400 text-sm mb-6">
            {total > 0
              ? `${total.toLocaleString()} resultados para «${initialQ || query}»`
              : `Sin resultados para «${initialQ || query}»`}
          </p>
          {results.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
            >
              {results.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <MediaCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">No se encontró nada 😕</p>
              <p className="text-slate-600 text-sm mt-2">
                Prueba con otro término de búsqueda
              </p>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && !searched && (
        <div className="text-center py-24">
          <Search size={48} className="mx-auto mb-4 text-slate-700" />
          <p className="text-slate-500 text-lg">
            Busca películas o series por nombre
          </p>
        </div>
      )}
    </div>
  );
}
