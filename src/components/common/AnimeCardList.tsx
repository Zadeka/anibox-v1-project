// src/components/common/AnimeCardList.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import type { AnimeItem } from "@/types/anime.type";

interface AnimeCardListProps {
  anime: AnimeItem;
}

export function AnimeCardList({ anime }: AnimeCardListProps) {
  return (
    <Link
      to="/anime/$animeId"
      params={{ animeId: anime.mal_id.toString() }}
      className="block"
    >
      <Card className="flex flex-row overflow-hidden border-purple-200 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-purple-500/50 dark:border-purple-800 dark:bg-purple-950/50">
        {/* Image - Fixed Width with Gradient Background */}
        <div className="h-40 w-28 shrink-0 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
          <img
            src={anime.images.webp.large_image_url}
            alt={anime.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              {/* Title with English Title */}
              <h3 className="line-clamp-2 font-semibold leading-tight text-purple-900 dark:text-white">
                {anime.title}
                {anime.title_english && anime.title_english !== anime.title && (
                  <span className="text-purple-600 dark:text-white">
                    {" "}
                    ({anime.title_english})
                  </span>
                )}
              </h3>

              {/* Rating Badge with Gradient */}
              <Badge className="shrink-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md">
                ⭐ {anime.score || "N/A"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pb-3">
            {/* Type & Status Badges with Colors */}
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge className="border-pink-400 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-100">
                {anime.type}
              </Badge>
              <Badge className="border-purple-400 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-white">
                {anime.status}
              </Badge>
            </div>

            {/* Synopsis with Colored Text */}
            {anime.synopsis && (
              <p className="line-clamp-2 text-sm text-purple-700 dark:text-white">
                {anime.synopsis}
              </p>
            )}
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
