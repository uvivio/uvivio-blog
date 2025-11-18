import { defineQuery } from 'next-sanity';
import { client } from './client';

export const allBlogPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt
    },
    "category": categories[0]-> {
      _id,
      title,
      slug
    },
    author-> {
      name,
      role,
      image {
        asset
      }
    },
    publishedAt,
    readTime
  }
`);

export const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt
    },
    "category": categories[0]-> {
      _id,
      title,
      slug
    },
    author-> {
      name,
      role,
      image {
        asset
      }
    },
    publishedAt,
    readTime
  }
`);

export const searchPostsQuery = defineQuery(`
  *[_type == "post" && (
    title match $searchQuery + "*" ||
    excerpt match $searchQuery + "*"
  )] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt
    },
    "category": categories[0]-> {
      _id,
      title,
      slug
    },
    author-> {
      name,
      role,
      image {
        asset
      }
    },
    publishedAt,
    readTime
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt
    },
    categories[]-> {
      _id,
      title,
      slug
    },
    author-> {
      name,
      role,
      image {
        asset
      },
      bio
    },
    publishedAt,
    readTime,
    body
  }
`);

export const allCategoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`);

export const relatedPostsQuery = defineQuery(`
  *[_type == "post" && _id != $postId && $categoryId in categories[]->_id] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage {
      asset,
      alt
    },
    "category": categories[0]-> {
      _id,
      title,
      slug
    },
    author-> {
      name,
      role,
      image {
        asset
      }
    },
    publishedAt,
    readTime
  }
`);

export async function getAllBlogPosts() {
  return client.fetch(allBlogPostsQuery);
}

export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(postsByCategoryQuery, { categorySlug });
}

export async function searchPosts(searchQuery: string) {
  return client.fetch(searchPostsQuery, { searchQuery });
}

export async function getPostBySlug(slug: string) {
  return client.fetch(postBySlugQuery, { slug });
}

export async function getAllCategories() {
  return client.fetch(allCategoriesQuery);
}

export async function getRelatedPosts(postId: string, categoryId: string) {
  return client.fetch(relatedPostsQuery, { postId, categoryId });
}
