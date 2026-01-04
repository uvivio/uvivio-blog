"use client";

import { useMutation } from "@tanstack/react-query";
import { incrementViewAction } from "../actions/view-actions";

interface IncrementViewParams {
  slug: string;
}

export function useIncrementView() {
  return useMutation({
    mutationFn: async ({ slug }: IncrementViewParams) => {
      const result = await incrementViewAction(slug);

      if (result.error) {
        throw new Error(result.error);
      }

      return result;
    },
    retry: 1,
    onError: (error) => {
      console.debug("View tracking skipped:", error);
    },
  });
}
