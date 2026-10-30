# mycompany

DevOps & AIOps website. Static site built with [Astro](https://astro.build), checked and published by GitLab CI/CD, hosted free on GitLab Pages.

## Run it on your laptop

Needs Node.js 22.23.4 or newer (`node -v` to check).

```bash
npm ci            # install exact versions from package-lock.json
npm run dev       # live preview at http://localhost:4321
npm run build     # produce the real site in dist/
npm run preview   # serve dist/ locally to check the production build
```

## Where to change things

| You want to change… | Edit this file |
|---|---|
| Name, email, availability | `src/site.config.ts` |
| Homepage text, services, case studies | `src/pages/index.astro` |
| Colors and fonts | `src/styles/global.css` (the `:root` block at the top) |
| Header and footer | `src/layouts/Base.astro` |
| Pipeline | `.gitlab-ci.yml` |

Internal links must use the `u()` helper (`src/lib/url.ts`), for example `href={u('/blog/')}`, so they work whether the site is served at the root or under a sub-path.

## Write a blog post

Add a file to `src/pages/blog/`, for example `my-post.md`:

```markdown
---
layout: ../../layouts/Post.astro
title: My post title
description: One sentence shown on the card.
date: 2026-11-05
tag: Kubernetes
draft: false
---

Your text here.
```

Set `draft: true` to keep it off the site while you write.

## How a change goes live

```bash
git switch -c update-services          # 1. new branch
# edit files
git add -A && git commit -m "Update services copy"
git push -u origin update-services     # 2. push
# 3. open a merge request in GitLab → the "check" job runs
# 4. merge to main → the "pages" job publishes the site (~1–2 minutes)
```

## Pipeline (`.gitlab-ci.yml`)

| Job | Runs on | Does |
|---|---|---|
| `check` | merge requests and other branches | `npm ci`, `npm audit --audit-level=high`, build, verify `index.html` |
| `pages` | `main` only | the same checks, then publishes `public/` to GitLab Pages |

`SITE_URL` is set from GitLab's `$CI_PAGES_URL`, so links are correct at whatever address GitLab gives the site.

## Rollback

```bash
git revert <bad-commit-sha>
git push origin main        # pages job republishes the previous good version
```

Or in GitLab: **Build → Pipelines**, open the last good pipeline on `main`, and re-run its `pages` job.

## One-time GitLab settings

- **Deploy → Pages:** turn on **Force HTTPS**. Note the site URL shown there.
- **Settings → Repository → Protected branches:** `main` = no one can push directly, maintainers can merge.
- **Settings → Merge requests:** tick **Pipelines must succeed**.

## Cost

| Item | Cost |
|---|---|
| GitLab repo, CI/CD (400 compute minutes/month on Free), Pages hosting | Free |
| Custom domain (optional, later) | ~US$10–11/year |

Each pipeline takes about 1 minute, so the free minutes cover several hundred changes a month.
