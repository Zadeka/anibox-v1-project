// src/components/common/AnimeLoadingSkeleton.tsx
interface AnimeLoadingSkeletonProps {
  count?: number;
  viewMode: "grid" | "list";
}

export function AnimeLoadingSkeleton({
  count = 25,
  viewMode,
}: AnimeLoadingSkeletonProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] animate-pulse rounded-lg bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded-lg bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800"
        />
      ))}
    </div>
  );
}
