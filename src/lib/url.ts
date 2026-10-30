// Builds an internal link that respects the site's base path.
// u('/blog/') → '/blog/' at the root, or '/mycompany/blog/' under a sub-path.
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function u(path: string): string {
  return base + (path.startsWith('/') ? path : '/' + path);
}
