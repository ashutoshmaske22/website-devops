# mycompany

DevOps & AIOps consulting website. Static site built with [Astro](https://astro.build), checked by GitHub Actions, hosted on Cloudflare Pages.

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
| Domain name | `astro.config.mjs` → `site` |
| Security headers | `public/_headers` |

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
git switch -c update-services     # 1. new branch
# edit files
git add -A && git commit -m "Update services copy"
git push -u origin update-services  # 2. push
# 3. open a pull request on GitHub → CI runs + Cloudflare posts a preview URL
# 4. merge → production updates in ~1 minute
```

## Rollback

- **Fast:** Cloudflare dashboard → Workers & Pages → this project → Deployments → pick the last good one → Rollback.
- **In code:** `git revert <bad-commit-sha> && git push`

## Checks on every pull request (`.github/workflows/ci.yml`)

1. `npm ci`: install exact dependency versions
2. `npm audit --audit-level=high`: fail on known high or critical vulnerabilities
3. `npm run build`: the site must build
4. `dist/index.html` must exist

Dependabot (`.github/dependabot.yml`) opens update PRs weekly.

## Cost

| Item | Cost |
|---|---|
| Cloudflare Pages hosting + CDN | Free tier |
| GitHub repo + Actions | Free tier |
| Domain (.com via Cloudflare Registrar) | ~US$10–11/year |
