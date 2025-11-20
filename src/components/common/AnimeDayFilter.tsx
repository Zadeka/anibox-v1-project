// src/components/common/AnimeDayFilter.tsx
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DayType =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

interface AnimeDayFilterProps {
  value?: DayType;
  onChange: (value: DayType | undefined) => void;
}

export function AnimeDayFilter({ value, onChange }: AnimeDayFilterProps) {
  const getDayLabel = (day?: DayType): string => {
    const dayLabels: Record<string, string> = {
      monday: "Senin",
      tuesday: "Selasa",
      wednesday: "Rabu",
      thursday: "Kamis",
      friday: "Jumat",
      saturday: "Sabtu",
      sunday: "Minggu",
    };

    return day ? dayLabels[day] : "Semua Hari";
  };

  const getDayEmoji = (day: DayType): string => {
    const dayEmojis: Record<DayType, string> = {
      monday: "🌙",
      tuesday: "🔥",
      wednesday: "💧",
      thursday: "⚡",
      friday: "🌟",
      saturday: "🎭",
      sunday: "☀️",
    };

    return dayEmojis[day];
  };

  const days: DayType[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <Calendar className="mr-2 h-4 w-4" />
          {value
            ? `${getDayEmoji(value)} ${getDayLabel(value)}`
            : getDayLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-purple-200 dark:border-purple-800">
        <DropdownMenuLabel className="text-purple-600 dark:text-purple-400">
          Pilih Hari Tayang
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onChange(undefined)}>
          📆 Semua Hari
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {days.map((day) => (
          <DropdownMenuItem
            key={day}
            onClick={() => onChange(day)}
            className={value === day ? "bg-purple-100 dark:bg-purple-900" : ""}
          >
            {getDayEmoji(day)} {getDayLabel(day)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Export type untuk digunakan di file lain
export type { DayType };
