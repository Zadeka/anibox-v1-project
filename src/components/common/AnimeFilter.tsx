import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface FilterOptions {
  q?: string;
  type?: string;
  status?: string;
  rating?: string;
  order_by?: string;
  sort?: string;
}

interface AnimeFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  onReset: () => void;
}

export function AnimeFilter({ onFilterChange, onReset }: AnimeFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "all" ? undefined : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setFilters({});
    onReset();
    setShowFilters(false);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari anime..."
            value={filters.q || ""}
            onChange={(e) => handleFilterChange("q", e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={filters.type || "all"}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Semua Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Type</SelectItem>
                <SelectItem value="tv">TV</SelectItem>
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
                <SelectItem value="airing">Airing</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
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
                <SelectItem value="g">G - All Ages</SelectItem>
                <SelectItem value="pg">PG - Children</SelectItem>
                <SelectItem value="pg13">PG-13 - Teens 13+</SelectItem>
                <SelectItem value="r17">R - 17+</SelectItem>
                <SelectItem value="r">R+ - Mild Nudity</SelectItem>
                <SelectItem value="rx">Rx - Hentai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Urutkan</label>
            <Select
              value={filters.order_by || "all"}
              onValueChange={(value) => handleFilterChange("order_by", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Default</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="score">Score</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="favorites">Favorites</SelectItem>
                <SelectItem value="start_date">Start Date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end md:col-span-2 lg:col-span-4">
            <Button variant="outline" onClick={handleReset} className="w-full">
              <X className="mr-2 h-4 w-4" />
              Reset Filter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
