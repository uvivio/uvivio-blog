import {
  AllBlogPostsQueryResult,
  AllCategoriesQueryResult,
  PostBySlugQueryResult,
} from '@/sanity/sanity.types';

export type BlogPost = NonNullable<AllBlogPostsQueryResult>[number];
export type BlogPostDetail = NonNullable<PostBySlugQueryResult>;
export type BlogCategory = NonNullable<AllCategoriesQueryResult>[number];
