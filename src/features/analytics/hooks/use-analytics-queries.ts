import { useQuery } from "@tanstack/react-query";
import {
  getAllPostsAction,
  getAnalyticsOverviewAction,
  getTopPostsAction,
  getViewsTrendAction,
} from "../actions/analytics-actions";

export function useAnalyticsOverview() {
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => getAnalyticsOverviewAction(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTopPosts(limit: number = 10) {
  return useQuery({
    queryKey: ["analytics", "top-posts", limit],
    queryFn: () => getTopPostsAction(limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllPosts(
  page: number = 1,
  limit: number = 20,
  search: string = ""
) {
  return useQuery({
    queryKey: ["analytics", "all-posts", page, limit, search],
    queryFn: () => getAllPostsAction({ page, limit, search }),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

export function useViewsTrend(days: number = 30) {
  return useQuery({
    queryKey: ["analytics", "trend", days],
    queryFn: () => getViewsTrendAction(days),
    staleTime: 10 * 60 * 1000,
  });
}
