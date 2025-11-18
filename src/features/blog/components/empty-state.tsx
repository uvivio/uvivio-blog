import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BLOG_LOTTIE } from "../constants";

type EmptyStateProps = {
  message?: string;
};

export function EmptyState({
  message = "No blog posts found",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <DotLottieReact
        src={BLOG_LOTTIE.EMPTY_STATE}
        loop
        autoplay
        className="h-48 w-48"
      />
      <p className="mt-4 font-primary text-lg text-tertiary-7">{message}</p>
    </div>
  );
}
