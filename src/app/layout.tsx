import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { marketingUrl } from '@/content/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(marketingUrl),
  title: 'HeadGarden — Small practices for a steadier day',
  description:
    'An accountless general-wellness app for guided practices, gentle routines, local progress, and bounded AI reflection.',
  alternates: { canonical: marketingUrl },
  applicationName: 'HeadGarden',
  authors: [{ name: 'OBSCURACODE LTD', url: 'https://codeobscura.com/' }],
  category: 'health & fitness',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: marketingUrl,
    siteName: 'HeadGarden',
    title: 'HeadGarden — Small practices for a steadier day',
    description:
      'An accountless general-wellness app for guided practices, gentle routines, local progress, and bounded AI reflection.',
    images: [{ url: '/app-icon.png', width: 1024, height: 1024, alt: 'HeadGarden' }],
  },
  twitter: {
    card: 'summary',
    title: 'HeadGarden — Small practices for a steadier day',
    description: 'A calm, accountless app for everyday general wellness.',
    images: ['/app-icon.png'],
  },
  icons: {
    icon: '/app-icon.png',
    apple: '/app-icon.png',
  },
};

export const viewport = {
  colorScheme: 'light',
  themeColor: '#fff3ea',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
