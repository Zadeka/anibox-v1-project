// src/components/common/AnimeViewToggle.tsx
import { Grid3x3, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnimeViewToggleProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function AnimeViewToggle({
  viewMode,
  onViewModeChange,
}: AnimeViewToggleProps) {
  return (
    <Tabs value={viewMode} onValueChange={(v) => onViewModeChange(v as any)}>
      <TabsList>
        <TabsTrigger value="grid">
          <Grid3x3 className="mr-2 h-4 w-4" />
          Grid
        </TabsTrigger>
        <TabsTrigger value="list">
          <List className="mr-2 h-4 w-4" />
          List
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
