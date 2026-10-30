import { u } from './url';

// Reads every Markdown post in src/pages/blog/ and returns them newest first.
// To publish a post: add a .md file there with the frontmatter shown in the example post.

type Frontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tag: string;
  draft?: boolean;
};

export type Post = Frontmatter & { url: string; dateLabel: string };

export async function getPosts(): Promise<Post[]> {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>('../pages/blog/*.md', {
    eager: true,
  });
  return Object.entries(modules)
    .filter(([, m]) => !m.frontmatter.draft)
    .map(([file, m]) => ({
      ...m.frontmatter,
      url: u(`/blog/${file.split('/').pop()!.replace(/\.md$/, '')}/`),
      dateLabel: new Date(m.frontmatter.date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
