"use server";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { createClient } from "next-sanity";
import { cookies } from "next/headers";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export async function getAnalyticsOverviewAction() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("analytics_auth");

  if (!authCookie) {
    return { error: "Unauthorized", authenticated: false };
  }

  try {
    const posts = await client.fetch(`
      *[_type == "post"] {
        _id,
        title,
        views,
        publishedAt
      }
    `);

    const totalViews = posts.reduce(
      (sum: number, post: any) => sum + (post.views || 0),
      0
    );
    const totalPosts = posts.length;
    const postsWithViews = posts.filter(
      (post: any) => (post.views || 0) > 0
    ).length;
    const recentPosts = posts
      .sort(
        (a: any, b: any) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .slice(0, 5);
    const averageViews =
      totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;

    return {
      authenticated: true,
      totalViews,
      totalPosts,
      postsWithViews,
      recentPosts,
      averageViews,
    };
  } catch (error) {
    console.error("Error fetching overview:", error);
    return { error: "Failed to fetch overview", authenticated: true };
  }
}

export async function getTopPostsAction(limit: number = 10) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("analytics_auth");

  if (!authCookie) {
    return { error: "Unauthorized", authenticated: false };
  }

  try {
    const posts = await client.fetch(
      `*[_type == "post" && views > 0] | order(views desc) [0...$limit] {
        _id,
        title,
        slug,
        views,
        publishedAt,
        "category": categories[0]->title
      }`,
      { limit: limit - 1 }
    );

    return {
      authenticated: true,
      posts,
    };
  } catch (error) {
    console.error("Error fetching top posts:", error);
    return { error: "Failed to fetch top posts", authenticated: true };
  }
}

export async function getAllPostsAction({
  page = 1,
  limit = 20,
  search = "",
}: PaginationParams = {}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("analytics_auth");

  if (!authCookie) {
    return { error: "Unauthorized", authenticated: false };
  }

  try {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const searchFilter = search
      ? `&& (title match "*${search}*" || categories[]->title match "*${search}*")`
      : "";

    const query = `{
      "posts": *[_type == "post" ${searchFilter}] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        views,
        publishedAt,
        "category": categories[0]->title
      },
      "total": count(*[_type == "post" ${searchFilter}])
    }`;

    const result = await client.fetch(query, { start, end });

    return {
      authenticated: true,
      posts: result.posts,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return { error: "Failed to fetch posts", authenticated: true };
  }
}

export async function getViewsTrendAction(days: number = 30) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("analytics_auth");

  if (!authCookie) {
    return { error: "Unauthorized", authenticated: false };
  }

  try {
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - days);
    const dateString = daysAgo.toISOString();

    const posts = await client.fetch(
      `*[_type == "post" && publishedAt >= $date] | order(publishedAt asc) {
        publishedAt,
        views
      }`,
      { date: dateString }
    );

    const trendData = posts.reduce((acc: any[], post: any) => {
      const date = new Date(post.publishedAt).toLocaleDateString();
      const existing = acc.find((item) => item.date === date);

      if (existing) {
        existing.views += post.views || 0;
      } else {
        acc.push({ date, views: post.views || 0 });
      }

      return acc;
    }, []);

    return {
      authenticated: true,
      trend: trendData,
    };
  } catch (error) {
    console.error("Error fetching trend:", error);
    return { error: "Failed to fetch trend", authenticated: true };
  }
}
