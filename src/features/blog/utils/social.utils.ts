import toast from 'react-hot-toast';

export function getShareableUrl(postUrl: string): string {
  if (typeof window === 'undefined') return postUrl;
  return `${window.location.origin}${postUrl}`;
}

export function generateSocialUrl(
  template: string,
  url: string,
  title: string
): string {
  return template
    .replace('{{url}}', encodeURIComponent(url))
    .replace('{{title}}', encodeURIComponent(title));
}

export async function copyToClipboard(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
    return true;
  } catch (err) {
    toast.error('Failed to copy link');
    return false;
  }
}

export function openShareWindow(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
}
