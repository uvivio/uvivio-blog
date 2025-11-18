"use client";

import { cn } from "@/libs/utils";
import { useState } from "react";
import toast from "react-hot-toast";

type CopyButtonProps = {
  text: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
};

export function CopyButton({
  text,
  className = "",
  textClassName = "",
  iconClassName = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex h-10 items-center gap-2 rounded-full border border-tertiary-5 bg-white px-4 font-primary text-sm font-medium text-tertiary-8 transition-all hover:border-primary-6 hover:bg-primary-1 hover:text-primary-6",
        className
      )}
    >
      {copied ? (
        <>
          <svg
            className={cn("h-4 w-4", iconClassName)}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className={cn("hidden md:inline", textClassName)}>Copied!</span>
        </>
      ) : (
        <>
          <svg
            className={cn("h-4 w-4", iconClassName)}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span className={cn("hidden md:inline", textClassName)}>
            Copy link
          </span>
        </>
      )}
    </button>
  );
}
