---
layout: ../../layouts/Post.astro
title: How this website is built and deployed
description: A static site, a Git repo, a CI gate and a CDN. Total running cost is the price of a domain.
date: 2026-10-30
tag: Platform
---

I wanted this site to follow the same rules I use for client work: everything in Git, every change reviewed by a pipeline, and a rollback that takes seconds.

## The setup

- **Astro** builds the site into plain HTML files. There is no server to patch or scale.
- **GitHub** holds the code. Every change goes through a pull request.
- **GitHub Actions** builds the site and runs a security audit on every pull request. If either fails, the change can't merge.
- **Cloudflare Pages** serves the files from its global CDN and gives every pull request its own preview URL.

## What a change looks like

1. Create a branch and edit a file.
2. Open a pull request. CI runs and Cloudflare posts a preview link.
3. Check the preview, then merge. Production updates in about a minute.

## When something goes wrong

Every deployment is kept. If a release breaks something, I either roll back to the previous deployment in the Cloudflare dashboard or run `git revert` on the bad commit and push. Both are fast because the site is just files.

## What it costs

The hosting, CI and CDN all fit inside free tiers at this traffic level. The only fixed cost is the domain.
