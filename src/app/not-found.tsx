import Link from 'next/link';

import { BrandMark } from '@/components/BrandMark';

export default function NotFound() {
  return (
    <main className="not-found">
      <div aria-hidden="true" className="not-found__contour" />
      <BrandMark compact />
      <p className="eyebrow eyebrow--dark">Path not found</p>
      <h1>This seed has not been planted.</h1>
      <p>The page may have moved, or it may still be growing.</p>
      <Link className="status-action status-action--light" href="/">
        Return to HeadGarden
      </Link>
    </main>
  );
}
