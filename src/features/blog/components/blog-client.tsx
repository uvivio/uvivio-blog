'use client';

import { BlogList, CategoryTabs } from '@/features/blog/components';
import type { BlogCategory, BlogPost } from '@/features/blog/types';
import { useRouter } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';
import { POSTS_PER_PAGE } from '../constants';

type BlogPageClientProps = {
  posts: BlogPost[];
  categories: BlogCategory[];
  initialCategory: string;
};

export function BlogPageClient({
  posts,
  categories,
  initialCategory,
}: BlogPageClientProps) {
  const router = useRouter();
  const [categoryQuery] = useQueryState('category', {
    defaultValue: initialCategory,
  });

  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger
      .withOptions({
        scroll: true,
      })
      .withDefault(1)
  );

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const handleCategoryChange = (categorySlug: string) => {
    router.push(`/blog?category=${categorySlug}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mb-8">
        <CategoryTabs
          categories={categories}
          selectedCategory={categoryQuery}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <BlogList
        posts={paginatedPosts}
        currentPage={currentPage}
        totalPosts={posts.length}
        pageSize={POSTS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </>
  );
}
