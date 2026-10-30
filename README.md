# website-devops

DevOps & AIOps website. Static site built with [Astro](https://astro.build), checked and published by GitHub Actions, hosted free on GitHub Pages.

Live: https://ashutoshmaske22.github.io/website-devops/

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
| Pipeline | `.github/workflows/deploy.yml` |

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
# 3. open a pull request on GitHub → Actions builds and audits it
# 4. merge to main → Actions deploys to GitHub Pages (~1–2 minutes)
```

## Pipeline (`.github/workflows/deploy.yml`)

| Trigger | Does |
|---|---|
| Pull request | `npm ci`, `npm audit --audit-level=high`, build, verify `index.html` (no deploy) |
| Push to `main` | the same checks, then deploys to GitHub Pages |
| Manual (Actions tab → Run workflow) | the same as a push to `main` |

`SITE_URL` comes from GitHub's Pages settings, so links stay correct at the `github.io/website-devops/` sub-path and after you add a custom domain.

Dependabot (`.github/dependabot.yml`) opens update PRs weekly for npm and monthly for Actions.

## Rollback

```bash
git revert <bad-commit-sha>
git push origin main        # Actions redeploys the previous good version
```

Or: **Actions** tab → open the last good run on `main` → **Re-run all jobs**.

## One-time GitHub settings

- **Settings → Pages → Build and deployment → Source: GitHub Actions** (required, or the deploy job fails)
- **Settings → Branches → Add rule for `main`:** require a pull request and require the `build` check to pass
- The repo must be **public** for free GitHub Pages

## Cost

| Item | Cost |
|---|---|
| GitHub repo, Actions, Pages (public repo) | Free |
| Custom domain (optional, later) | ~US$10–11/year |
