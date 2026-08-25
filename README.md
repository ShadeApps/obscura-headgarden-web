# HeadGarden website

The public prelaunch website for HeadGarden, an accountless general-wellness
app for adults 18+. HeadGarden is not medical care.

- Marketing: <https://headgarden.codeobscura.com>
- Terms: <https://codeobscura.com/headgarden/terms.html>
- Privacy: <https://codeobscura.com/headgarden/privacy.html>

## Architecture

This repository is a Next.js 16 App Router site exported as static HTML, CSS,
and JavaScript. It has no application server, database, API route, form, or
runtime environment variable. The `out/` directory is created by `next build`
and is never committed.

The prelaunch page uses semantic server-rendered components, native disclosure
controls, local fonts, an app-owned icon, and app-authored illustrative shapes.
It does not use private catalog media, provider artwork, remote fonts, or public
App Store links before launch.

## Privacy boundary

The site sets no cookies and includes no analytics, advertising, tracking,
email capture, waitlist, or user-submitted content. Its only external
destinations are the canonical CodeObscura legal/company pages and the listed
legal contact email. The bundled Unbounded and Golos Text fonts are distributed
with their SIL Open Font License files under `public/licenses/`.

## Local development

Use Node.js 24 and the committed npm lockfile.

```sh
npm ci
npm run dev
```

The local site is served at <http://localhost:3000> by default.

## Verification

```sh
npm run lint
npm run typecheck
npm run test
npm run build
npm run test
npm run verify:static
```

The static verifier checks required files, internal links and fragments,
external origins, canonical/legal URLs, source-map absence, and prohibited
privacy or private-media surfaces. It emits only a fixed pass/fail label.

## Deployment

Pushes to `main` and manual workflow dispatches run the GitHub Pages workflow.
The workflow uses Node.js 24, repeats the complete verification sequence,
uploads only `out/`, and deploys through the protected `github-pages`
environment. `public/CNAME` binds the export to
`headgarden.codeobscura.com`; HTTPS remains enabled in GitHub Pages settings.

DNS and Pages settings are managed separately from this repository. Changes to
the apex CodeObscura site, legal pages, or other subdomains are not part of this
deployment.
