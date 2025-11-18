"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const BlogHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/blog/search?query=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  return (
    <div className="relative w-full bg-tertiary-12 px-6 py-16 sm:py-24 pt-40 md:pt-40 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-4 font-secondary text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-7xl">
          The Uvivio Blog
        </h1>
        <p className="mb-8 font-primary text-base text-tertiary-5 sm:text-lg">
          Practical how-tos, voice-AI insights, and community lessons
          <br className="hidden sm:block" />
          to power modern teaching and confident learning.
        </p>

        <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here"
              className="h-12 w-full rounded-lg border border-tertiary-7 bg-tertiary-11 px-4 pl-12 font-primary text-sm text-white placeholder:text-tertiary-7 focus:border-primary-6 focus:outline-none focus:ring-2 focus:ring-primary-6/20"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tertiary-7" />
          </div>
        </form>
      </div>
    </div>
  );
};
