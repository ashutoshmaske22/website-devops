---
layout: ../../layouts/Post.astro
title: How this website is built and deployed
description: A static site, one GitLab project, a CI gate and free hosting. Total running cost is zero.
date: 2026-10-30
tag: Platform
---

I wanted this site to follow the same rules I use at work: everything in Git, every change checked by a pipeline, and a rollback that takes seconds.

## The setup

- **Astro** builds the site into plain HTML files. There is no server to patch or scale.
- **GitLab** holds the code. Changes go through merge requests.
- **GitLab CI/CD** installs dependencies, runs a security audit and builds the site on every merge request. If any step fails, the change can't merge.
- **GitLab Pages** hosts the result for free once a change lands on `main`.

## What a change looks like

1. Create a branch and edit a file.
2. Open a merge request. The pipeline runs the checks.
3. Merge. The `pages` job publishes the new version in a minute or two.

## When something goes wrong

Every version lives in Git. If a release breaks something, I run `git revert` on the bad commit and push, and the pipeline republishes the last good version.

## What it costs

Nothing. The repository, the pipeline minutes and the hosting all fit inside GitLab's free tier at this size.
