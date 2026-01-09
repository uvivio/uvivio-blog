import type { BlogPost } from "../types";
import { BlogCard } from "./blog-card";

type RelatedPostsProps = {
  posts: BlogPost[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-tertiary-4 bg-tertiary-2 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 font-secondary text-3xl font-bold text-tertiary-12">
          Related Reading
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
