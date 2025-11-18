import Breadcrumb from '@/components/atoms/common/breadcrumb';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type BlogPostNavigationProps = {
  items: Array<{
    label: string;
    href?: string;
  }>;
};

export function BlogPostNavigation({ items }: BlogPostNavigationProps) {
  return (
    <>
      {/* Mobile Navigation */}
      <div className="mb-5 block md:hidden">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-primary text-sm font-medium text-tertiary-8 transition-colors hover:text-primary-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      {/* Desktop Breadcrumb */}
      <div className="mb-8 hidden md:block">
        <Breadcrumb items={items} />
      </div>
    </>
  );
}
