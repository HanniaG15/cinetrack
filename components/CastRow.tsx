import Image from "next/image";
import { IMG } from "@/lib/tmdb";
import { User } from "lucide-react";
import type { CastMember } from "@/types";

export default function CastRow({ cast }: { cast: CastMember[] }) {
  const visible = cast.slice(0, 15);
  if (!visible.length) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-5">Reparto principal</h2>
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 pb-2">
          {visible.map((member) => (
            <div key={member.id} className="shrink-0 w-24 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#1a1928] mx-auto mb-2 border-2 border-white/5">
                {member.profile_path ? (
                  <Image
                    src={`${IMG}/w185${member.profile_path}`}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600">
                    <User size={32} />
                  </div>
                )}
              </div>
              <p className="text-white text-xs font-semibold leading-tight">
                {member.name}
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5 leading-tight line-clamp-2">
                {member.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
