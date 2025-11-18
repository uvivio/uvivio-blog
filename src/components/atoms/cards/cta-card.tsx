import Link from 'next/link';

type CtaCardProps = {
  title: string;
  description: string;
  href: string;
  buttonText?: string;
  className?: string;
};

export function CtaCard({
  title,
  description,
  href,
  buttonText = 'Get started now',
  className = '',
}: CtaCardProps) {
  return (
    <div className={`my-12 rounded-2xl bg-primary-1 p-8 ${className}`}>
      <h3 className="mb-3 font-secondary text-2xl font-bold text-tertiary-12">
        {title}
      </h3>
      <p className="mb-6 font-primary text-base leading-relaxed text-tertiary-8">
        {description}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-lg bg-primary-6 px-6 py-3 font-primary text-sm font-semibold text-white transition-all hover:bg-primary-7"
      >
        {buttonText}
      </Link>
    </div>
  );
}
