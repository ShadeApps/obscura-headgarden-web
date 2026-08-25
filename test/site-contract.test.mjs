import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const readRequired = (path) => {
  assert.equal(existsSync(path), true, `${path} must exist`);
  return readFileSync(path, 'utf8');
};

test('publishes the approved HeadGarden prelaunch promise', () => {
  const content = readRequired('src/content/site.ts');

  assert.match(content, /Small practices\. A steadier day\./);
  assert.match(content, /Coming to the App Store/);
  assert.match(content, /A private space for everyday wellness/);
  assert.match(content, /adults 18\+/i);
  assert.match(content, /not medical care/i);
});

test('uses the exact canonical legal URLs and launch plans', () => {
  const content = readRequired('src/content/site.ts');

  assert.match(
    content,
    /https:\/\/codeobscura\.com\/headgarden\/terms\.html/,
  );
  assert.match(
    content,
    /https:\/\/codeobscura\.com\/headgarden\/privacy\.html/,
  );
  assert.match(content, /\$9\.99/);
  assert.match(content, /no free trial/i);
  assert.match(content, /\$69\.99/);
  assert.match(content, /3-day free trial/i);
  assert.match(content, /eligible new subscriber/i);
  assert.match(content, /local storefront pricing may vary/i);
});

test('describes the implemented accountless privacy boundaries', () => {
  const content = readRequired('src/content/site.ts');

  assert.match(content, /accountless/i);
  assert.match(content, /progress[^.]*on (?:your )?device/i);
  assert.match(content, /Health[^.]*transient/i);
  assert.match(content, /consent-gated/i);
  assert.match(content, /ad-free Premium/i);
});

test('keeps prohibited launch claims and collection surfaces out', () => {
  const files = [
    readRequired('src/content/site.ts'),
    readRequired('src/app/layout.tsx'),
    readRequired('src/app/page.tsx'),
    readRequired('package.json'),
  ].join('\n');

  for (const prohibited of [
    /apps\.apple\.com/i,
    /<form\b/i,
    /<input\b/i,
    /waitlist/i,
    /newsletter/i,
    /testimonial/i,
    /trusted by/i,
    /five[- ]star/i,
    /\b\d+(?:,\d+)* users\b/i,
    /google-analytics/i,
    /firebase-analytics/i,
    /@vercel\/analytics/i,
    /catalog\.v1\.json/i,
    /now_playing_cover/i,
    /r2\b/i,
    /diagnos(?:e|is|tic)/i,
    /\bcures?\b/i,
    /\bprevents?\b/i,
  ]) {
    assert.doesNotMatch(files, prohibited);
  }

  assert.doesNotMatch(files, /https:\/\/fonts\.(?:googleapis|gstatic)\.com/i);
  assert.doesNotMatch(files, /<script[^>]+src=["']https?:\/\//i);
});

test('renders the approved semantic narrative in order', () => {
  const page = readRequired('src/app/page.tsx');
  const sections = readRequired('src/components/SiteSections.tsx');
  const phone = readRequired('src/components/PhoneGarden.tsx');
  const brand = readRequired('src/components/BrandMark.tsx');
  const source = [page, sections, phone, brand].join('\n');

  const narrative = [
    '<HeroSection',
    '<TensionSection',
    '<GrowthSection',
    '<PreviewSection',
    '<PrivacySection',
    '<PlansSection',
    '<FaqSection',
    '<FinalPanel',
    '<SiteFooter',
  ];
  let prior = -1;
  for (const marker of narrative) {
    const position = page.indexOf(marker);
    assert.ok(position > prior, `${marker} must follow the prior section`);
    prior = position;
  }

  assert.match(source, /<nav\b/);
  assert.match(source, /<main\b/);
  assert.match(source, /<footer\b/);
  assert.match(source, /<h1\b/);
  assert.match(source, /<details\b/);
  assert.match(source, /id="practices"/);
  assert.match(source, /id="privacy"/);
  assert.match(source, /id="plans"/);
  assert.match(source, /id="faq"/);
  assert.match(source, /Two-minute reset/);
  assert.match(source, /A quieter evening/);
  assert.match(source, /What would feel supportive next\?/);
  assert.doesNotMatch(source, /<video\b/i);
  assert.doesNotMatch(source, /autoplay/i);
  assert.doesNotMatch(source, /dangerouslySetInnerHTML/);
});

test('uses the approved local visual system and accessibility fallbacks', () => {
  const css = readRequired('src/app/globals.css');

  for (const token of [
    '#d63a2e',
    '#ff6745',
    '#ffb08a',
    '#fff3ea',
    '#26161a',
    '#557a62',
    '#fffbf7',
    '#f7e8de',
    '#e4cfc3',
  ]) {
    assert.match(css.toLowerCase(), new RegExp(token));
  }

  assert.match(css, /@font-face/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /min-(?:height|block-size):\s*44px/);
  assert.match(css, /min-(?:width|inline-size):\s*44px/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s+print/);
  assert.match(css, /overflow-x:\s*(?:clip|hidden)/);
  assert.match(css, /html\s*{[^}]*overflow-x:\s*(?:clip|hidden)/s);
  assert.match(css, /body\s*{[^}]*min-inline-size:\s*320px/s);
  assert.match(
    css,
    /@media \(max-width: 24rem\)[\s\S]*\.hero h1\s*{[^}]*font-size:\s*min\(/,
  );
  assert.match(
    css,
    /@media \(max-width: 24rem\)[\s\S]*h2[^}]*font-size:\s*min\(/,
  );
  assert.match(
    css,
    /@media \(max-width: 24rem\)[\s\S]*\.site-header__nav\s*{[^}]*flex-wrap:\s*wrap/,
  );
  assert.match(
    css,
    /@media \(max-width: 24rem\)[\s\S]*\.plans-grid[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/,
  );
  assert.match(
    css,
    /@media \(max-width: 24rem\)[\s\S]*\.plan-card__price strong\s*{[^}]*font-size:\s*min\(/,
  );
  assert.match(
    css,
    /@media \(max-width: 24rem\)[\s\S]*\.site-footer__links a\s*{[^}]*overflow-wrap:\s*anywhere/,
  );
  assert.match(
    css,
    /@media \(max-width: 24rem\)[\s\S]*\.not-found h1\s*{[^}]*font-size:\s*min\(/,
  );
});
