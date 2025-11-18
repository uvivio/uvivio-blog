import { APP_DESC, APP_NAME, APP_OG_IMAGE, APP_SITE_URL } from '@/config';
import type { Metadata } from 'next';

const default_title = 'AI-Driven Mentorship & Personalized Learning Experience';

export const GeneratePageMetadata = ({
  title = default_title,
  ...rest
}: Partial<Metadata>): Metadata => ({
  title,
  description: rest.description ?? APP_DESC,
  keywords: rest?.keywords ?? [],
  openGraph: rest.openGraph ?? {
    title: APP_NAME,
    description: APP_DESC,
    url: APP_SITE_URL,
    siteName: APP_NAME,
    images: [
      {
        url: APP_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: rest.twitter ?? {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESC,
    site: '@uvivio',
    creator: '@uvivio_team',
    images: [APP_OG_IMAGE],
  },
  ...rest,
});
