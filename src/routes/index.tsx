// src/routes/index.tsx (GET All Anime)
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { getAllAnime } from "@/api/anime.api";
import { AnimeGrid } from "@/components/common/AnimeGrid";
import { AnimeGridSkeleton } from "@/components/common/AnimeCardSkeleton";
import { AnimeFilterSidebar } from "@/components/common/AnimeFilterSidebar";
import type { FilterOptions } from "@/components/common/AnimeFilterSidebar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import type { AnimeItem } from "@/types/anime.type";

function AnimeListPage() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getAllAnime(currentPage, filters);
        setAnimeList(response.data);
        setTotalPages(response.pagination.last_visible_page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        setError("Gagal memuat data anime. Silakan coba lagi.");
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Error State
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
          <h3 className="mt-4 text-lg font-semibold">Terjadi Kesalahan</h3>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6">
      {/* Header */}
      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Anime Populer</h1>
        <p className="text-muted-foreground">
          Jelajahi koleksi anime populer dan terbaru
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Left Side: Anime Grid (5 columns x 5 rows = 25 anime) */}
        <div className="flex-1 space-y-6">
          {loading ? (
            <AnimeGridSkeleton count={25} columns={5} />
          ) : animeList.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Tidak ada anime ditemukan
                </p>
              </div>
            </div>
          ) : (
            <>
              <AnimeGrid animeList={animeList} columns={5} />

              {/* Pagination - Di pojok kanan bawah */}
              {totalPages > 1 && (
                <div className="flex justify-end pr-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            currentPage > 1 && handlePageChange(currentPage - 1)
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {/* First Page */}
                      {currentPage > 2 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(1)}
                            className="cursor-pointer"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Ellipsis */}
                      {currentPage > 3 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {/* Previous Page */}
                      {currentPage > 1 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="cursor-pointer"
                          >
                            {currentPage - 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Current Page */}
                      <PaginationItem>
                        <PaginationLink isActive className="cursor-default">
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>

                      {/* Next Page */}
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="cursor-pointer"
                          >
                            {currentPage + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      {/* Ellipsis */}
                      {currentPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {/* Last Page */}
                      {currentPage < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(totalPages)}
                            className="cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            currentPage < totalPages &&
                            handlePageChange(currentPage + 1)
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Side: Fixed Filter Sidebar */}
        <div className="w-80 shrink-0">
          <div className="fixed right-6 top-24 w-80">
            <AnimeFilterSidebar
              onFilterChange={handleFilterChange}
              onReset={handleResetFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: AnimeListPage,
});
