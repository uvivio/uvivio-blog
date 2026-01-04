import ImageComponent from "@/components/atoms/common/image";
import { PortableText } from "@portabletext/react";
import { getBlogImageUrl } from "../utils/blog.utils";
import { TableRenderer } from "./table-renderer";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="my-8 overflow-hidden rounded-lg">
          <ImageComponent
            src={getBlogImageUrl(value.asset, 1200, 800)}
            alt={value.alt || "Blog image"}
            className="h-auto w-full object-cover"
          />
          {value.caption && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    table: ({ value }: { value: any }) => <TableRenderer value={value} />,
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold tracking-tight md:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-3 mt-6 text-xl font-semibold tracking-tight md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mb-3 mt-6 text-lg font-semibold tracking-tight md:text-xl">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-6 border-l-4 border-accent pl-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-2 ml-4 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-2 ml-4 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      >
        {children}
      </a>
    ),
  },
};

type PortableTextRendererProps = {
  value: any;
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="prose max-w-full">
      <PortableText value={value} components={portableTextComponents} />
    </div>
  );
}
