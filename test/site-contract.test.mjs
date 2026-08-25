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
