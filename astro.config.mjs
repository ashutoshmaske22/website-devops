// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL is the full public address of the site.
// In GitLab CI it is set from $CI_PAGES_URL, so the site works both at
//   https://<name>.gitlab.io/            (root)
//   https://<user>.gitlab.io/mycompany/  (sub-path)
// Locally it falls back to the root.
const siteUrl = new URL(process.env.SITE_URL || 'https://example.com');

export default defineConfig({
  site: siteUrl.origin,
  base: siteUrl.pathname,
  output: 'static',
});
