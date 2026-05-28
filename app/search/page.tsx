import { Suspense } from "react";
import SearchContent from "./SearchContent";
import { Loader2 } from "lucide-react";

export const metadata = { title: "Buscar — CineTrack" };

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-32 flex justify-center">
          <Loader2 size={32} className="animate-spin text-rose-500" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
