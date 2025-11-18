import { Avatar } from '@/components/atoms/avatar';
import ImageComponent from '@/components/atoms/common/image';
import { Tag } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '../types';
import { BLOG_DEFAULTS, BLOG_ICONS, BLOG_TEXT } from '../constants';
import {
  formatBlogDate,
  getAuthorImageUrl,
  getBlogImageUrl,
} from '../utils/blog.utils';

type BlogCardProps = {
  post: BlogPost;
};

export const BlogCard = ({ post }: BlogCardProps) => {
  const imageUrl = getBlogImageUrl(post.mainImage?.asset, 800, 500);
  const authorImageUrl = getAuthorImageUrl(post.author?.image?.asset, 80);
  const formattedDate = formatBlogDate(post.publishedAt);

  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="group flex flex-col overflow-hidden rounded border border-tertiary-4 bg-white shadow-[0_8px_24px_-12px_rgba(15,39,80,0.15)] transition-all duration-300 hover:shadow-[0_16px_32px_-12px_rgba(15,39,80,0.25)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-tertiary-3">
        <ImageComponent
          src={imageUrl}
          alt={post.mainImage?.alt || post.title || 'Blog post image'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center justify-between text-sm">
          <Tag className="m-0 rounded-md border-0 bg-tertiary-4 px-2 py-0.5 font-primary text-xs font-medium text-tertiary-8">
            {post.category?.title || BLOG_DEFAULTS.CATEGORY}
          </Tag>

          <span className="font-primary text-tertiary-7">
            {BLOG_TEXT.PUBLISHED} {formattedDate}
          </span>
        </div>

        <h3 className="mb-3 font-secondary text-xl font-bold leading-tight tracking-tight text-tertiary-12 transition-colors group-hover:text-primary-6">
          {post.title || BLOG_DEFAULTS.POST_TITLE}
        </h3>

        <p className="mb-4 flex-1 font-primary text-sm leading-relaxed text-tertiary-8">
          {post.excerpt || ''}
        </p>

        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-center gap-1 font-primary text-sm font-medium text-primary-6 transition-all group-hover:gap-2">
            <span>{BLOG_TEXT.READ_MORE}</span>
            <Image
              src={BLOG_ICONS.ARROW_UP_RIGHT}
              alt=""
              width={16}
              height={16}
              className="h-4 w-4"
            />
          </div>
          <div className="relative flex items-center gap-3">
            <Avatar
              avatar_url={authorImageUrl}
              name={post.author?.name || BLOG_DEFAULTS.AUTHOR_NAME}
              className="object-cover"
            />

            <div>
              <p className="font-primary text-sm font-semibold text-tertiary-12">
                {post.author?.name || BLOG_DEFAULTS.AUTHOR_NAME}
              </p>
              <p className="font-primary text-xs text-tertiary-7">
                {post.author?.role || BLOG_DEFAULTS.AUTHOR_ROLE}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
