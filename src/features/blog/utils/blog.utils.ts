import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { format } from "date-fns";

export function getBlogImageUrl(
  imageAsset: SanityImageSource | null | undefined,
  width: number,
  height: number,
  fallback: string = "/assets/images/testimonial"
): string {
  if (!imageAsset) return fallback;
  return urlFor(imageAsset).width(width).height(height).url();
}

export function getAuthorImageUrl(
  imageAsset: SanityImageSource | null | undefined,
  size: number = 80,
  fallback: string = "/assets/images/testimonial/amina.png"
): string {
  if (!imageAsset) return fallback;
  return urlFor(imageAsset).width(size).height(size).url();
}

export function formatBlogDate(date: string | null | undefined): string {
  if (!date) return "";
  return format(new Date(date), "MMM dd, yyyy");
}

export function getReadTimeText(minutes: number | null | undefined): string {
  if (!minutes) return "";
  return `${minutes} min read`;
}
