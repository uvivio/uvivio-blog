import { env } from '@/env';
import type { Metadata } from 'next';

export const APP_NAME = 'Uvivio';

export const SEO_KEYWORDS = [
  'uvivio',
  'productivity',
  'startup',
  'modern tools',
  'mentoring',
  'online mentoring',
  'mentorship',
  'tech',
  'skills',
  'vocational',
  'skills',
  'mentor',
  'mentee',
  'collaboration',
  'meeting',
  APP_NAME,
];

export const APP_SITE_URL = env.NEXT_PUBLIC_APP_URL ?? 'https://uvivio.com';
export const APP_OG_IMAGE = `${APP_SITE_URL}/og-image.png`;
export const APP_DESC = `Uvivio is a modern mentoring platform designed to help individuals grow faster through meaningful guidance. Whether you're advancing your career, switching industries, or developing new skills, Uvivio matches you with the right mentors to provide personalized advice, feedback, and support.`;

export const APP_METADATA: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_NAME,
  icons: { icon: '/favicon.ico' },
  keywords: SEO_KEYWORDS,
  creator: `${APP_NAME} Team`,
  publisher: APP_NAME,
  category: 'technology',
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESC,
    site: '@uvivio',
    creator: '@uvivio_team',
    images: [APP_OG_IMAGE],
  },
  openGraph: {
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
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  robots: 'index, follow, facebookexternalhit',
};
