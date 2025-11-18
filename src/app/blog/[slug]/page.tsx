import JoinBanner from '@/components/atoms/banners/join-banner';
import ImageComponent from '@/components/atoms/common/image';
import { env } from '@/env';
import {
  BlogPostHeader,
  BlogPostNavigation,
  BlogSocials,
  PortableTextRenderer,
  RelatedPosts,
  TeachSmarterCTA,
} from '@/features/blog/components';
import { getBlogImageUrl } from '@/features/blog/utils/blog.utils';
import {
  getAllBlogPosts,
  getPostBySlug,
  getRelatedPosts,
} from '@/sanity/lib/fetch';
import { GeneratePageMetadata } from '@/utils/helpers';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    const postsToPrerender = posts.slice(0, 27);
    return postsToPrerender.map((post) => ({
      slug: post.slug?.current || '',
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const imageUrl = getBlogImageUrl(post.mainImage?.asset, 1200, 630);
    const categories =
      post.categories.map((category) => category.title as string) || [];

    return {
      title: post.title || 'Blog Post',
      description: post.excerpt || '',
      keywords: categories,
      openGraph: {
        title: post.title || 'Blog Post',
        description: post.excerpt || '',
        images: [imageUrl],
        tags: categories,
        type: 'article',
        publishedTime: post.publishedAt || undefined,
        authors: post.author?.name ? [post.author.name] : undefined,
        url: `${env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title || 'Blog Post',
        description: post.excerpt || '',
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.log('Error generating page metadata', error);
    return GeneratePageMetadata({
      title: 'Blog Post',
      description: '',
      keywords: ['uvivio blog', 'blogs', 'tech blog', 'mentorship blog'],
    });
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts =
    post.categories && post.categories.length > 0
      ? await getRelatedPosts(post._id, post.categories[0]._id)
      : [];

  const imageUrl = getBlogImageUrl(post.mainImage?.asset, 1200, 675);

  const breadcrumbItems = [
    { label: 'Blog post', href: '/blog' },
    { label: post.title || 'Untitled' },
  ];

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24">
      <article className="mx-auto max-w-4xl px-6 py-12 lg:px-12">
        <BlogPostNavigation items={breadcrumbItems} />

        <BlogPostHeader post={post} />

        <div className="relative mb-8 aspect-video overflow-hidden">
          <ImageComponent
            src={imageUrl}
            alt={post.mainImage?.alt || post.title || 'Blog post image'}
            className="h-auto w-full object-cover"
          />
        </div>

        {post.body && <PortableTextRenderer value={post.body} />}

        <TeachSmarterCTA />

        <BlogSocials postUrl={`/blog/${slug}`} postTitle={post.title || ''} />
      </article>

      <div className="mx-auto max-w-[1300px] space-y-5 px-6 py-12 lg:px-12">
        <RelatedPosts posts={relatedPosts} />
        <JoinBanner />
      </div>
    </div>
  );
}
