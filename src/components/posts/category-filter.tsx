"use client";

import { cn } from "@/lib/utils";
import { ICategory } from "@/types/category.type";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

interface CategoryFilterProps {
  categories: ICategory[];
  selectedCategory: string | null;
}

export function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectedCategory = useCallback(
    (categoryId: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (categoryId) {
        params.set("categoryId", categoryId);
      } else {
        params.delete("categoryId");
      }
      params.set("page", "1");
      router.push(`/?${params.toString()}`);
    },
    [searchParams, router],
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* All button */}
      <button
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
          "cursor-pointer",
          selectedCategory === null
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
        )}
        onClick={() => handleSelectedCategory(null)}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category.id}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            "cursor-pointer",
            selectedCategory === category.id
              ? "bg-emerald-600 text-white"
              : "bg-muted text-muted-foreground hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400",
          )}
          onClick={() => handleSelectedCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
