'use client';

import { Pagination } from 'antd';
import { useCallback } from 'react';
import type { BlogPost } from '../types';
import { BlogCard } from './blog-card';
import { EmptyState } from './empty-state';

type BlogListProps = {
  posts: BlogPost[];
  currentPage: number;
  totalPosts: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
};

export const BlogList = ({
  posts,
  currentPage,
  totalPosts,
  pageSize = 9,
  onPageChange,
}: BlogListProps) => {
  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange]
  );

  const renderPaginationItem = useCallback(
    (page: number, type: string) => {
      if (type === 'prev' || type === 'next') {
        const isPrev = type === 'prev';
        const totalPages = Math.ceil(totalPosts / pageSize);
        const disabled = isPrev ? currentPage === 1 : currentPage >= totalPages;

        return (
          <button
            type="button"
            disabled={disabled}
            className={`px-4 py-2 font-primary text-sm font-medium ${
              disabled
                ? 'cursor-not-allowed text-tertiary-5'
                : 'text-tertiary-8 hover:text-primary-6'
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (!disabled) {
                handlePageChange(isPrev ? currentPage - 1 : currentPage + 1);
              }
            }}
          >
            {isPrev ? 'Prev' : 'Next'}
          </button>
        );
      }

      const isActive = page === currentPage;
      return (
        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full border-none font-primary text-sm font-medium transition-all ${
            isActive
              ? 'bg-primary-6 text-white shadow-[0_8px_20px_-10px_rgba(0,78,234,0.5)]'
              : 'text-tertiary-8 hover:bg-tertiary-3'
          }`}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(page);
          }}
        >
          {page}
        </button>
      );
    },
    [currentPage, handlePageChange, totalPosts, pageSize]
  );

  if (posts.length === 0) {
    return <EmptyState message="No blog posts found in this category" />;
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      {totalPosts > pageSize && (
        <div className="flex items-center justify-center pt-8">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            pageSize={pageSize}
            total={totalPosts}
            className="[&_.ant-pagination-item]:border-none [&_.ant-pagination-item]:!bg-transparent"
            showSizeChanger={false}
            itemRender={(page, type) =>
              renderPaginationItem(Number(page), type)
            }
          />
        </div>
      )}
    </div>
  );
};
