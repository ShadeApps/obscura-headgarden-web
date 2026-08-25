import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { marketingUrl } from '@/content/site';

export const metadata: Metadata = {
  metadataBase: new URL(marketingUrl),
  title: 'HeadGarden — Small practices for a steadier day',
  description:
    'An accountless general-wellness app for guided practices, gentle routines, local progress, and bounded AI reflection.',
  alternates: { canonical: marketingUrl },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
