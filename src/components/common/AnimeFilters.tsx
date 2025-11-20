// src/components/common/AnimeFilters.tsx
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FilterOptions } from "@/components/common/AnimeFilterSidebar";

interface AnimeFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string | undefined) => void;
}

export function AnimeFilters({
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
}: AnimeFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Search Input */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari anime..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Type Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            {filters.type ? `Type: ${filters.type}` : "Tipe Anime"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Pilih Tipe</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onFilterChange("type", undefined)}>
            Semua Tipe
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("type", "tv")}>
            TV Series
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("type", "movie")}>
            Movie
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("type", "ova")}>
            OVA
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {filters.status ? `Status: ${filters.status}` : "Status"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Pilih Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onFilterChange("status", undefined)}>
            Semua Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("status", "airing")}>
            Sedang Tayang
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("status", "complete")}>
            Selesai
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {filters.order_by ? `Sort: ${filters.order_by}` : "Urutkan"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Urutkan Berdasarkan</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onFilterChange("order_by", undefined)}>
            Default
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("order_by", "score")}>
            Rating Tertinggi
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("order_by", "popularity")}>
            Popularitas
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
