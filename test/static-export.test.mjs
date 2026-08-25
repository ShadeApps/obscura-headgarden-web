import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import test from 'node:test';

const marketingUrl = 'https://headgarden.codeobscura.com';
const termsUrl = 'https://codeobscura.com/headgarden/terms.html';
const privacyUrl = 'https://codeobscura.com/headgarden/privacy.html';

const sourceDeliverables = [
  'public/.nojekyll',
  'public/CNAME',
  'public/app-icon.png',
  'public/fonts/Unbounded-Medium.ttf',
  'public/fonts/Unbounded-Bold.ttf',
  'public/fonts/GolosText-Regular.ttf',
  'public/fonts/GolosText-SemiBold.ttf',
  'public/licenses/Unbounded-OFL.txt',
  'public/licenses/GolosText-OFL.txt',
  'src/app/not-found.tsx',
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  'scripts/verify-static.mjs',
  '.github/workflows/pages.yml',
  'README.md',
];

const exportedDeliverables = [
  'out/index.html',
  'out/404.html',
  'out/robots.txt',
  'out/sitemap.xml',
  'out/CNAME',
  'out/.nojekyll',
  'out/app-icon.png',
  'out/fonts/Unbounded-Medium.ttf',
  'out/fonts/Unbounded-Bold.ttf',
  'out/fonts/GolosText-Regular.ttf',
  'out/fonts/GolosText-SemiBold.ttf',
  'out/licenses/Unbounded-OFL.txt',
  'out/licenses/GolosText-OFL.txt',
];

function walkFiles(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? walkFiles(path) : [path];
  });
}

test('declares the complete static Pages delivery surface', () => {
  for (const path of sourceDeliverables) {
    assert.equal(existsSync(path), true, `${path} must exist`);
  }

  assert.equal(readFileSync('public/CNAME', 'utf8').trim(), 'headgarden.codeobscura.com');
  assert.equal(statSync('public/.nojekyll').size, 0);

  const notFound = readFileSync('src/app/not-found.tsx', 'utf8');
  assert.match(notFound, /This seed has not been planted/);
  assert.match(notFound, /from 'next\/link'/);
  assert.match(notFound, /<Link[^>]+href="\/"/);
  assert.match(notFound, /<BrandMark/);

  for (const route of ['src/app/robots.ts', 'src/app/sitemap.ts']) {
    assert.match(readFileSync(route, 'utf8'), /export const dynamic = 'force-static'/);
  }

  assert.match(
    readFileSync('next.config.ts', 'utf8'),
    /turbopack:\s*{[^}]*root:\s*process\.cwd\(\)/s,
  );

  const publicPaths = walkFiles('public').map((path) => relative('public', path));
  assert.deepEqual(publicPaths.sort(), [
    '.nojekyll',
    'CNAME',
    'app-icon.png',
    'fonts/GolosText-Regular.ttf',
    'fonts/GolosText-SemiBold.ttf',
    'fonts/Unbounded-Bold.ttf',
    'fonts/Unbounded-Medium.ttf',
    'licenses/GolosText-OFL.txt',
    'licenses/Unbounded-OFL.txt',
  ]);
});

test('keeps any completed export self-contained and policy-safe', () => {
  if (!existsSync('out')) return;

  for (const path of exportedDeliverables) {
    assert.equal(existsSync(path), true, `${path} must exist after build`);
  }

  const index = readFileSync('out/index.html', 'utf8');
  assert.match(index, new RegExp(marketingUrl.replaceAll('.', '\\.')));
  assert.match(index, new RegExp(termsUrl.replaceAll('.', '\\.')));
  assert.match(index, new RegExp(privacyUrl.replaceAll('.', '\\.')));

  for (const fragment of ['top', 'practices', 'privacy', 'plans', 'faq']) {
    assert.match(index, new RegExp(`href=["']#${fragment}["']`));
    assert.match(index, new RegExp(`id=["']${fragment}["']`));
  }

  const files = walkFiles('out');
  assert.equal(files.some((path) => extname(path) === '.map'), false);

  const text = files
    .filter((path) => ['.css', '.html', '.js', '.txt', '.xml'].includes(extname(path)))
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n');

  for (const prohibited of [
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
  ]) {
    assert.doesNotMatch(text, prohibited);
  }
});

test('publishes only a verified static artifact with least privilege', () => {
  const workflow = readFileSync('.github/workflows/pages.yml', 'utf8');

  for (const contract of [
    /push:\s*\n\s*branches:\s*\n\s*- main/,
    /workflow_dispatch:/,
    /contents: read/,
    /pages: write/,
    /id-token: write/,
    /cancel-in-progress: true/,
    /actions\/checkout@v7/,
    /actions\/setup-node@v7/,
    /node-version: 24/,
    /actions\/configure-pages@v6/,
    /actions\/upload-pages-artifact@v5/,
    /include-hidden-files: true/,
    /actions\/deploy-pages@v5/,
  ]) {
    assert.match(workflow, contract);
  }

  const orderedCommands = [
    'npm ci',
    'npm run lint',
    'npm run typecheck',
    'npm run test',
    'npm run build',
    'npm run verify:static',
  ];
  let previous = -1;
  for (const command of orderedCommands) {
    const position = workflow.indexOf(command, previous + 1);
    assert.equal(position > previous, true, `${command} must run in order`);
    previous = position;
  }

  assert.doesNotMatch(workflow, /contents: write/);
  assert.doesNotMatch(workflow, /pull_request:/);
});
