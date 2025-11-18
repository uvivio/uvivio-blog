'use client';

import { CopyButton } from '@/components/atoms/buttons/copy-button';
import Image from 'next/image';
import { BLOG_TEXT, SHARE_PLATFORMS } from '../constants';
import {
  generateSocialUrl,
  getShareableUrl,
  openShareWindow,
} from '../utils/social.utils';

type BlogSocialsProps = {
  postUrl: string;
  postTitle: string;
};

export function BlogSocials({ postUrl, postTitle }: BlogSocialsProps) {
  const fullUrl = getShareableUrl(postUrl);

  const handleShare = (platform: (typeof SHARE_PLATFORMS)[number]) => {
    const url = generateSocialUrl(platform.urlTemplate, fullUrl, postTitle);
    openShareWindow(url);
  };

  return (
    <div className="border-t border-tertiary-4 pt-8">
      <h4 className="mb-4 font-primary text-sm font-semibold capitalize tracking-wide text-tertiary-8">
        {BLOG_TEXT.SHARE_VIA}
      </h4>
      <div className="flex flex-wrap items-center gap-3">
        {SHARE_PLATFORMS.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-6/10 transition-all hover:bg-primary-6/20"
            aria-label={`Share on ${platform.name}`}
          >
            <Image
              src={platform.icon}
              alt={platform.name}
              width={25}
              height={25}
              className="h-6 w-6"
            />
          </button>
        ))}
        <CopyButton text={fullUrl} />
      </div>
    </div>
  );
}
