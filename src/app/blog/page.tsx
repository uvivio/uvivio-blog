import JoinBanner from '@/components/atoms/banners/join-banner';
import { BlogHero, BlogPageClient } from '@/features/blog/components';
import type { BlogCategory } from '@/features/blog/types';
import {
  getAllBlogPosts,
  getAllCategories,
  getPostsByCategory,
} from '@/sanity/lib/fetch';

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const categorySlug = params.category || 'all';

  const [posts, categoriesData] = await Promise.all([
    categorySlug === 'all'
      ? getAllBlogPosts()
      : getPostsByCategory(categorySlug),
    getAllCategories(),
  ]);

  const allCategory: BlogCategory = {
    _id: 'all',
    title: 'All',
    slug: { _type: 'slug', current: 'all' },
    description: null,
  };
  const categories = [allCategory, ...(categoriesData || [])];

  return (
    <div className="min-h-screen bg-white">
      <BlogHero />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <BlogPageClient
          posts={posts || []}
          categories={categories}
          initialCategory={categorySlug}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <JoinBanner />
      </div>
    </div>
  );
}
