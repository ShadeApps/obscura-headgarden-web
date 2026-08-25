import type { MetadataRoute } from 'next';

import { marketingUrl } from '@/content/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const marketingOrigin = new URL(marketingUrl).origin;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${marketingOrigin}/sitemap.xml`,
    host: marketingOrigin,
  };
}
