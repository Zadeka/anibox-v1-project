// src/components/common/AnimeCard.tsx
import { Link } from "@tanstack/react-router";
import { Star, Tv } from "lucide-react";
import type { AnimeItem } from "@/types/anime.type";

interface AnimeCardProps {
  anime: AnimeItem;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link
      to="/anime/$animeId"
      params={{ animeId: anime.mal_id.toString() }}
      className="group block overflow-hidden rounded-lg border bg-card transition-all hover:scale-[1.02] hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
          alt={anime.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-110"
          loading="lazy"
        />

        {/* Score Badge */}
        {anime.score && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{anime.score.toFixed(1)}</span>
          </div>
        )}

        {/* Type Badge */}
        {anime.type && (
          <div className="absolute left-2 top-2 rounded-md bg-primary/90 px-2 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
            {anime.type}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
          {anime.title}
        </h3>

        {/* Episodes Info */}
        {anime.episodes && (
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Tv className="h-3 w-3" />
            <span>{anime.episodes} eps</span>
          </div>
        )}
      </div>
    </Link>
  );
}
