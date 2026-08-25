import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, join, normalize, relative, resolve } from 'node:path';

const outputRoot = resolve('out');
const requiredFiles = [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'CNAME',
  '.nojekyll',
  'app-icon.png',
  'fonts/Unbounded-Medium.ttf',
  'fonts/Unbounded-Bold.ttf',
  'fonts/GolosText-Regular.ttf',
  'fonts/GolosText-SemiBold.ttf',
  'licenses/Unbounded-OFL.txt',
  'licenses/GolosText-OFL.txt',
];
const textExtensions = new Set(['.css', '.html', '.js', '.txt', '.xml']);
const allowedOrigins = new Set([
  'https://headgarden.codeobscura.com',
  'https://codeobscura.com',
  'http://www.sitemaps.org',
  'http://www.w3.org',
]);
const prohibited = [
  /<form\b/i,
  /<input\b/i,
  /document\.cookie/i,
  /google-analytics/i,
  /firebase-analytics/i,
  /@vercel\/analytics/i,
  /apps\.apple\.com/i,
  /HEADGARDEN_BETA_TOKEN/i,
  /catalog\.v1\.json/i,
  /now_playing_cover/i,
  /source-media/i,
  /private-provenance/i,
  /https:\/\/fonts\.(?:googleapis|gstatic)\.com/i,
  /<script[^>]+src=["']https?:\/\//i,
];

function walkFiles(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? walkFiles(path) : [path];
  });
}

function outputPathForUrl(raw, sourcePath) {
  const withoutFragment = raw.split('#', 1)[0].split('?', 1)[0];
  if (withoutFragment === '') return sourcePath;

  const decoded = decodeURIComponent(withoutFragment);
  const candidate = decoded.startsWith('/')
    ? resolve(outputRoot, `.${decoded}`)
    : resolve(dirname(sourcePath), decoded);
  assert.equal(
    candidate === outputRoot || candidate.startsWith(`${outputRoot}/`),
    true,
  );

  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    return join(candidate, 'index.html');
  }
  if (decoded.endsWith('/')) return join(candidate, 'index.html');
  return candidate;
}

function verifyInternalReference(raw, sourcePath, sourceText) {
  if (
    raw.startsWith('mailto:') ||
    raw.startsWith('tel:') ||
    raw.startsWith('data:') ||
    raw.startsWith('blob:')
  ) {
    return;
  }

  if (/^https?:\/\//i.test(raw)) {
    assert.equal(allowedOrigins.has(new URL(raw).origin), true);
    return;
  }

  if (raw.startsWith('#')) {
    const id = decodeURIComponent(raw.slice(1));
    assert.equal(
      new RegExp(`\\bid=["']${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`).test(
        sourceText,
      ),
      true,
    );
    return;
  }

  assert.equal(existsSync(outputPathForUrl(raw, sourcePath)), true);
}

function verifyHtml(path, text) {
  const attributes = text.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi);
  for (const match of attributes) {
    verifyInternalReference(match[1], path, text);
  }

  const metadataUrls = text.matchAll(/\bcontent=["'](https?:\/\/[^"']+)["']/gi);
  for (const match of metadataUrls) {
    verifyInternalReference(match[1], path, text);
  }
}

function verifyCss(path, text) {
  const references = text.matchAll(/url\(["']?([^"')]+)["']?\)/gi);
  for (const match of references) {
    verifyInternalReference(match[1], path, text);
  }
  const imports = text.matchAll(/@import\s+["']([^"']+)["']/gi);
  for (const match of imports) {
    verifyInternalReference(match[1], path, text);
  }
}

function verifyExternalOrigins(text) {
  for (const match of text.matchAll(/https?:\/\/[^\s"'<>),]+/gi)) {
    assert.equal(allowedOrigins.has(new URL(match[0]).origin), true);
  }
}

function verify() {
  assert.equal(existsSync(outputRoot), true);
  for (const path of requiredFiles) {
    assert.equal(existsSync(join(outputRoot, path)), true);
  }
  assert.equal(readFileSync(join(outputRoot, 'CNAME'), 'utf8').trim(), 'headgarden.codeobscura.com');
  assert.equal(statSync(join(outputRoot, '.nojekyll')).size, 0);

  const files = walkFiles(outputRoot);
  assert.equal(files.some((path) => extname(path) === '.map'), false);

  for (const path of files) {
    const extension = extname(path);
    if (!textExtensions.has(extension)) continue;
    const text = readFileSync(path, 'utf8');
    for (const pattern of prohibited) assert.doesNotMatch(text, pattern);

    if (extension === '.html') verifyHtml(path, text);
    if (extension === '.css') verifyCss(path, text);
    if (extension === '.xml') verifyExternalOrigins(text);
  }

  const index = readFileSync(join(outputRoot, 'index.html'), 'utf8');
  for (const fragment of ['top', 'practices', 'privacy', 'plans', 'faq']) {
    assert.match(index, new RegExp(`href=["']#${fragment}["']`));
    assert.match(index, new RegExp(`id=["']${fragment}["']`));
  }

  const sitemap = readFileSync(join(outputRoot, 'sitemap.xml'), 'utf8');
  for (const url of [
    'https://headgarden.codeobscura.com',
    'https://codeobscura.com/headgarden/terms.html',
    'https://codeobscura.com/headgarden/privacy.html',
  ]) {
    assert.match(sitemap, new RegExp(url.replaceAll('.', '\\.')));
  }

  const robots = readFileSync(join(outputRoot, 'robots.txt'), 'utf8');
  for (const directive of [
    'Allow: /',
    'Host: https://headgarden.codeobscura.com',
    'Sitemap: https://headgarden.codeobscura.com/sitemap.xml',
  ]) {
    assert.match(robots, new RegExp(directive.replaceAll('.', '\\.')));
  }

  assert.equal(
    normalize(relative(outputRoot, join(outputRoot, 'index.html'))),
    'index.html',
  );
}

try {
  verify();
  console.log('HEADGARDEN_STATIC_VERIFY=PASS');
} catch {
  console.error('HEADGARDEN_STATIC_VERIFY=FAIL');
  process.exitCode = 1;
}
