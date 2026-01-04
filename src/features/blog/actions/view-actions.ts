"use server";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { createClient } from "next-sanity";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token:
    process.env.SANITY_API_TOKEN || process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

export async function incrementViewAction(slug: string) {
  try {
    if (!slug) {
      return { error: "Slug is required", views: 0 };
    }

    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] { _id, views }`,
      { slug }
    );

    if (!post) {
      return { error: "Post not found", views: 0 };
    }

    const currentViews = post.views || 0;
    const newViews = currentViews + 1;

    await client.patch(post._id).set({ views: newViews }).commit();

    return { views: newViews };
  } catch (error) {
    console.error("Error incrementing views:", error);
    return { error: "Failed to increment views", views: 0 };
  }
}

export async function getViewsAction(slug: string) {
  try {
    if (!slug) {
      return { error: "Slug is required", views: 0 };
    }

    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] { views }`,
      { slug }
    );

    if (!post) {
      return { error: "Post not found", views: 0 };
    }

    return { views: post.views || 0 };
  } catch (error) {
    console.error("Error fetching views:", error);
    return { error: "Failed to fetch views", views: 0 };
  }
}
