import { BlogSearchClient } from '@/features/blog/components';
import { searchPosts } from '@/sanity/lib/fetch';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function BlogSearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;
  const query = params.query || '';

  const posts = query.trim() ? await searchPosts(query) : [];

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-2 font-primary text-sm font-medium text-primary-6 transition-colors hover:text-primary-7"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>

        <div className="mb-8">
          <h2 className="font-secondary text-2xl font-bold text-tertiary-12">
            Search Results
            {query && (
              <span className="ml-2 font-primary text-lg font-normal text-tertiary-7">
                for &quot;{query}&quot;
              </span>
            )}
          </h2>
          <p className="mt-2 font-primary text-sm text-tertiary-7">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {!query || query.trim() === '' ? (
          <div className="py-20 text-center">
            <p className="font-primary text-lg text-tertiary-7">
              Please enter a search query
            </p>
          </div>
        ) : (
          <BlogSearchClient posts={posts} />
        )}
      </div>
    </div>
  );
}
