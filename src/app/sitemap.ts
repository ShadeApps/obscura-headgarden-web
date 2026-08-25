import type { MetadataRoute } from 'next';

import { marketingUrl, privacyUrl, termsUrl } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: marketingUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: termsUrl,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: privacyUrl,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
