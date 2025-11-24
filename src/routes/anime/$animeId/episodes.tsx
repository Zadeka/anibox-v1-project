import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getAnimeEpisodes } from "@/api/anime.api";
import type { Episode } from "@/types/anime.type";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/anime/$animeId/episodes")({
  component: EpisodesPage,
});

function EpisodesPage() {
  const { animeId } = Route.useParams();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const response = await getAnimeEpisodes(Number(animeId));
        setEpisodes(response.data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [animeId]);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Episodes</h2>
      {episodes.length > 0 ? (
        <div className="grid gap-3">
          {episodes.map((ep) => (
            <Card key={ep.mal_id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">
                    Episode {ep.episode}: {ep.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Aired: {ep.aired || "N/A"}
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href={ep.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No episodes data available
        </p>
      )}
    </div>
  );
}
