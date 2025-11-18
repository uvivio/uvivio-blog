'use client';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-md text-center">
        <div className="flex justify-center">
          <DotLottieReact
            src="/assets/lottie/404.lottie"
            loop
            autoplay
            className="h-64 w-64"
          />
        </div>
        <h1 className="mb-4 font-secondary text-3xl font-bold text-tertiary-12">
          Blog Post Not Found
        </h1>
        <p className="mb-8 font-primary text-base text-tertiary-7">
          The blog post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-6 px-6 py-3 font-primary text-sm font-semibold text-white transition-all hover:bg-primary-7"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
