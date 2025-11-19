// src/components/common/AnimeGrid.tsx
import type { AnimeItem } from "@/types/anime.type";
import { AnimeCard } from "./AnimeCard";

interface AnimeGridProps {
  animeList: AnimeItem[];
  columns?: number;
}

export function AnimeGrid({ animeList, columns = 5 }: AnimeGridProps) {
  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}
