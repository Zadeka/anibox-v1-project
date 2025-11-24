import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAnimeCharacters } from "@/api/anime.api";
import type { Character } from "@/types/anime.type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/anime/$animeId/characters")({
  component: CharactersPage,
});

function CharactersPage() {
  const { animeId } = Route.useParams();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await getAnimeCharacters(Number(animeId));
        setCharacters(response.data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [animeId]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-64" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Characters</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {characters.map((char) => (
          <Card key={char.character.mal_id} className="overflow-hidden">
            <img
              src={char.character.images.jpg.image_url}
              alt={char.character.name}
              className="h-48 w-full object-cover"
            />
            <CardContent className="p-3">
              <p className="truncate text-sm font-semibold">
                {char.character.name}
              </p>
              <Badge variant="secondary" className="mt-1 text-xs">
                {char.role}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
