import type { FavoriteItem } from "@/types";

const KEY = "cinetrack_favorites";

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFavorite(id: number, media_type: string): boolean {
  return getFavorites().some((f) => f.id === id && f.media_type === media_type);
}

export function toggleFavorite(item: FavoriteItem): boolean {
  const favs = getFavorites();
  const idx = favs.findIndex(
    (f) => f.id === item.id && f.media_type === item.media_type
  );
  if (idx >= 0) {
    favs.splice(idx, 1);
    localStorage.setItem(KEY, JSON.stringify(favs));
    return false;
  } else {
    favs.unshift(item);
    localStorage.setItem(KEY, JSON.stringify(favs));
    return true;
  }
}

export function getFavoritesCount(): number {
  return getFavorites().length;
}

export function clearFavorites(): void {
  localStorage.removeItem(KEY);
}
