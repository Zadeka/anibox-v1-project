// src/components/common/AnimeCardGrid.tsx
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import type { AnimeItem } from "@/types/anime.type";

interface AnimeCardGridProps {
  anime: AnimeItem;
}

export function AnimeCardGrid({ anime }: AnimeCardGridProps) {
  return (
    <Link to="/anime/$animeId" params={{ animeId: anime.mal_id.toString() }}>
      <Card className="group flex flex-col overflow-hidden border-purple-200 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 dark:border-purple-800 dark:bg-purple-950/50">
        {/* Image dengan badges di atas */}
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
          />

          {/* Badges Overlay - Pojok Kiri Atas */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            <Badge className="border-purple-400 bg-purple-600 text-xs text-white shadow-lg backdrop-blur-sm">
              {anime.status}
            </Badge>
            <Badge className="border-pink-400 bg-pink-600 text-xs text-white shadow-lg backdrop-blur-sm">
              {anime.type}
            </Badge>
          </div>

          {/* Badge Rating - Pojok Kanan Atas */}
          <div className="absolute right-2 top-2">
            <Badge className="border-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-500 text-xs font-bold text-white shadow-lg">
              ⭐ {anime.score || "N/A"}
            </Badge>
          </div>
        </div>

        {/* Content - Judul 2 Bahasa */}
        <div className="flex flex-1 flex-col bg-gradient-to-b from-white to-purple-50 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex-1 pb-3 pt-3">
            <div className="space-y-1">
              <h3 className="line-clamp-1 text-sm font-bold leading-tight text-purple-900 dark:text-purple-100">
                {anime.title}
              </h3>
              <p className="line-clamp-1 text-xs text-purple-600 dark:text-purple-400">
                {anime.title_english || anime.title}
              </p>
            </div>
          </CardHeader>
        </div>
      </Card>
    </Link>
  );
}
