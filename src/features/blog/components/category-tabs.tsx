"use client";

import { cn } from "@/libs/utils";
import type { BlogCategory } from "../types";

type CategoryTabsProps = {
  categories: BlogCategory[];
  selectedCategory: string;
  onCategoryChange: (categorySlug: string) => void;
};

export const CategoryTabs = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryTabsProps) => {
  return (
    <div className="hide-scrollbar flex items-center gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isActive = selectedCategory === category.slug?.current;
        return (
          <button
            key={category._id}
            onClick={() => onCategoryChange(category.slug?.current || "")}
            className={cn(
              "flex-shrink-0 whitespace-nowrap rounded-full border px-5 py-2 font-primary text-sm font-medium tracking-tight transition-all duration-200",
              isActive
                ? "border-primary-6 bg-primary-6 text-white"
                : "border-tertiary-5 bg-white text-tertiary-8 hover:border-primary-6 hover:bg-primary-1 hover:text-primary-6"
            )}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};
