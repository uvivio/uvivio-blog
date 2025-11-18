import ImageComponent from '@/components/atoms/common/image';
import { urlFor } from '@/sanity/lib/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value.asset).width(1200).height(800).url();
      return (
        <figure className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded md:h-96">
            <ImageComponent
              src={imageUrl}
              alt={value.alt || 'Blog post image'}
              className="my-0 h-auto w-full object-cover"
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-center font-primary text-sm italic text-tertiary-7">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

type PortableTextRendererProps = {
  value: any;
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="prose max-w-full">
      <PortableText value={value} components={components} />
    </div>
  );
}
