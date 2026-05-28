import { ArrowRight } from "lucide-react";
import Link from "next/link";
import MediaCard from "./MediaCard";
import type { MediaItem, MediaType } from "@/types";

interface Props {
  title: string;
  items: MediaItem[];
  forceType?: MediaType;
  viewAllHref?: string;
}

export default function TrendingRow({
  title,
  items,
  forceType,
  viewAllHref,
}: Props) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between px-6 sm:px-8 mb-5">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-sm text-rose-400 hover:text-rose-300 transition-colors group"
          >
            Ver todos
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        )}
      </div>
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 px-6 sm:px-8 pb-2">
          {items
            .filter((i) => i.media_type !== "person")
            .slice(0, 20)
            .map((item) => (
              <MediaCard key={item.id} item={item} forceType={forceType} />
            ))}
        </div>
      </div>
    </section>
  );
}
