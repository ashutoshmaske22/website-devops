// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL is the full public address of the site.
// GitHub Actions sets it from the Pages settings (see .github/workflows/deploy.yml).
// Locally (npm run dev) it falls back to the root so links work at localhost:4321.
// After you add a custom domain in GitHub Pages settings, Actions picks it up automatically.
const siteUrl = new URL(process.env.SITE_URL || 'https://example.com');

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  output: 'static',
});
