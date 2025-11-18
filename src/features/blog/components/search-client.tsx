'use client';

import { BlogList } from '@/features/blog/components';
import type { BlogPost } from '@/features/blog/types';
import { parseAsInteger, useQueryState } from 'nuqs';
import { POSTS_PER_PAGE } from '../constants';

type BlogSearchClientProps = {
  posts: BlogPost[];
};

export function BlogSearchClient({ posts }: BlogSearchClientProps) {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <BlogList
      posts={paginatedPosts}
      currentPage={currentPage}
      totalPosts={posts.length}
      pageSize={POSTS_PER_PAGE}
      onPageChange={handlePageChange}
    />
  );
}
