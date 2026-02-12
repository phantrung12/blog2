"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* All button */}
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
          "cursor-pointer",
          selectedCategory === null
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        )}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            "cursor-pointer",
            selectedCategory === category
              ? "bg-emerald-600 text-white"
              : "bg-muted text-muted-foreground hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
