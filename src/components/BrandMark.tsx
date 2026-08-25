type BrandMarkProps = Readonly<{
  compact?: boolean;
}>;

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className="brand-mark">
      <svg
        aria-hidden="true"
        className="brand-mark__symbol"
        viewBox="0 0 48 48"
      >
        <path
          className="brand-mark__seed"
          d="M24 4.75c11.8 0 19.1 8.15 19.1 19.15 0 11.4-7.95 19.35-19.1 19.35S4.9 35.3 4.9 23.9C4.9 12.9 12.2 4.75 24 4.75Z"
        />
        <path
          className="brand-mark__stem"
          d="M24 33.5V20.2m0 3.3c-4.9-.15-8.15-2.65-9.5-7.3 4.75-.2 8.05 2.2 9.5 7.3Zm0-4.25c4.3-.25 7.25-2.45 8.65-6.55-4.25-.2-7.2 1.95-8.65 6.55Z"
        />
      </svg>
      {!compact && <span className="brand-mark__word">HeadGarden</span>}
    </span>
  );
}
