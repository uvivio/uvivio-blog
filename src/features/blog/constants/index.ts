export const POSTS_PER_PAGE = 9;

// Icon paths
export const BLOG_ICONS = {
  ARROW_UP_RIGHT: '/assets/images/blog/ArrowUpRight.svg',
  HOURGLASS_HIGH: '/assets/images/blog/HourglassHigh.svg',
} as const;

// Lottie animations
export const BLOG_LOTTIE = {
  EMPTY_STATE: '/assets/lottie/empty-state.lottie',
} as const;

// Social sharing platforms
export const SHARE_PLATFORMS = [
  {
    name: 'LinkedIn',
    icon: '/assets/images/blog/LinkedinLogo.svg',
    urlTemplate: 'https://www.linkedin.com/sharing/share-offsite/?url={{url}}',
  },
  {
    name: 'X (Twitter)',
    icon: '/assets/images/blog/XLogo.svg',
    urlTemplate: 'https://twitter.com/intent/tweet?url={{url}}&text={{title}}',
  },
  {
    name: 'Facebook',
    icon: '/assets/images/blog/FacebookLogo.svg',
    urlTemplate: 'https://www.facebook.com/sharer/sharer.php?u={{url}}',
  },
  {
    name: 'WhatsApp',
    icon: '/assets/images/blog/WhatsappLogo.svg',
    urlTemplate: 'https://wa.me/?text={{title}} {{url}}',
  },
] as const;

// Default values
export const BLOG_DEFAULTS = {
  AUTHOR_NAME: 'Anonymous',
  AUTHOR_ROLE: 'Writer',
  POST_TITLE: 'Untitled Post',
  CATEGORY: 'Uncategorized',
} as const;

// UI text
export const BLOG_TEXT = {
  READ_MORE: 'Read more',
  PUBLISHED: 'Published:',
  MIN_READ: 'min read',
  SHARE_VIA: 'Share this link via',
  COPY_LINK: 'Copy link',
  COPIED: 'Copied!',
} as const;
