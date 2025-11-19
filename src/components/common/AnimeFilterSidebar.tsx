import { useState, useEffect } from "react";
import { Search, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FilterOptions {
  q?: string;
  type?: string;
  status?: string;
  rating?: string;
  order_by?: string;
  sort?: string;
}

interface AnimeFilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export function AnimeFilterSidebar({
  onFilterChange,
  onReset,
}: AnimeFilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilterChange("q", searchQuery);
    }, 2000); // 2 detik delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "all" ? undefined : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleReset = () => {
    setFilters({});
    setSearchQuery("");
    onReset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filter & Pencarian
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input with Debounce */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Cari Anime</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Masukkan judul anime..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchQuery && (
            <p className="text-xs text-muted-foreground">
              Mencari setelah Anda selesai mengetik...
            </p>
          )}
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Tipe</label>
          <Select
            value={filters.type || "all"}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="tv">TV Series</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="ova">OVA</SelectItem>
              <SelectItem value="special">Special</SelectItem>
              <SelectItem value="ona">ONA</SelectItem>
              <SelectItem value="music">Music</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="airing">Sedang Tayang</SelectItem>
              <SelectItem value="complete">Selesai</SelectItem>
              <SelectItem value="upcoming">Akan Datang</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          <Select
            value={filters.rating || "all"}
            onValueChange={(value) => handleFilterChange("rating", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Semua Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Rating</SelectItem>
              <SelectItem value="g">G - Semua Umur</SelectItem>
              <SelectItem value="pg">PG - Anak-anak</SelectItem>
              <SelectItem value="pg13">PG-13 - Remaja 13+</SelectItem>
              <SelectItem value="r17">R - 17+</SelectItem>
              <SelectItem value="r">R+ - Mild Nudity</SelectItem>
              <SelectItem value="rx">Rx - Hentai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Urutkan Berdasarkan</label>
          <Select
            value={filters.order_by || "all"}
            onValueChange={(value) => handleFilterChange("order_by", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Default</SelectItem>
              <SelectItem value="title">Judul</SelectItem>
              <SelectItem value="score">Rating Tertinggi</SelectItem>
              <SelectItem value="popularity">Popularitas</SelectItem>
              <SelectItem value="favorites">Favorit</SelectItem>
              <SelectItem value="start_date">Tanggal Rilis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={handleReset} className="w-full">
          <X className="mr-2 h-4 w-4" />
          Reset Semua Filter
        </Button>
      </CardContent>
    </Card>
  );
}
