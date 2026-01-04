"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { useIncrementView } from "../hooks/use-view-mutation";

interface ViewCounterProps {
  slug: string;
  initialViews?: number;
}

const VIEWED_POSTS_KEY = "viewed_posts";

export function ViewCounter({ slug, initialViews = 0 }: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);
  const incrementView = useIncrementView();

  useEffect(() => {
    const trackView = () => {
      if (typeof window === "undefined") return;

      const viewedPosts = sessionStorage.getItem(VIEWED_POSTS_KEY);
      const viewedPostsSet = viewedPosts
        ? new Set(JSON.parse(viewedPosts))
        : new Set();

      if (viewedPostsSet.has(slug)) {
        return;
      }

      viewedPostsSet.add(slug);
      sessionStorage.setItem(
        VIEWED_POSTS_KEY,
        JSON.stringify([...viewedPostsSet])
      );

      incrementView.mutate(
        { slug },
        {
          onSuccess: (data) => {
            setViews(data.views);
          },
        }
      );
    };

    trackView();
  }, [slug]);

  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-600">
      <Eye className="h-4 w-4" />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
}
