import { Avatar } from "@/components/atoms/avatar";
import { CopyButton } from "@/components/atoms/buttons/copy-button";
import { Tag } from "antd";
import Image from "next/image";
import { BLOG_DEFAULTS, BLOG_ICONS, BLOG_TEXT } from "../constants";
import type { BlogPostDetail } from "../types";
import { formatBlogDate, getAuthorImageUrl } from "../utils/blog.utils";
import { ViewCounter } from "./view-counter";

type BlogPostHeaderProps = {
  post: BlogPostDetail;
  views?: number;
};

export async function BlogPostHeader({ post, views }: BlogPostHeaderProps) {
  const authorImageUrl = getAuthorImageUrl(post.author?.image?.asset, 80);
  const formattedDate = formatBlogDate(post.publishedAt);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-primary text-tertiary-7">
          {BLOG_TEXT.PUBLISHED} {formattedDate}
        </span>
        <span className="text-tertiary-7">•</span>
        <Tag className="m-0 rounded border-0 bg-tertiary-4 px-2 py-0.5 font-primary text-xs font-medium text-tertiary-8">
          {post.categories?.[0]?.title || BLOG_DEFAULTS.CATEGORY}
        </Tag>
        {post.readTime && (
          <>
            <span className="flex items-center gap-1 font-primary text-tertiary-7">
              <Image
                src={BLOG_ICONS.HOURGLASS_HIGH}
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
              {post.readTime} {BLOG_TEXT.MIN_READ}
            </span>
          </>
        )}
        <span className="ml-auto">
          <ViewCounter
            slug={post.slug?.current || ""}
            initialViews={views || 0}
          />
        </span>
      </div>

      <h1 className="mb-5 font-secondary text-3xl font-bold leading-tight tracking-tight text-tertiary-12 sm:text-5xl md:mb-8 md:text-4xl">
        {post.title}
      </h1>

      <div className="mb-8 flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            avatar_url={authorImageUrl}
            name={post.author?.name || BLOG_DEFAULTS.AUTHOR_NAME}
            className="object-cover"
          />

          <div>
            <p className="font-primary text-base font-semibold text-tertiary-12">
              {post.author?.name || BLOG_DEFAULTS.AUTHOR_NAME}
            </p>
            <p className="font-primary text-sm text-tertiary-7">
              {post.author?.role || BLOG_DEFAULTS.AUTHOR_ROLE}
            </p>
          </div>
        </div>
        <CopyButton
          className="group h-8 rounded-md border-none bg-tertiary-4 px-1.5"
          textClassName="md:hidden "
          iconClassName="size-5 text-tertiary-7 group-hover:text-primary-6"
          text={`${typeof window !== "undefined" ? window.location.origin : ""}/blog/${post.slug?.current}`}
        />
      </div>
    </>
  );
}
