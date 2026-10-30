---
layout: ../../layouts/Post.astro
title: A backup you never restored is a guess
description: A small, scheduled restore test for PostgreSQL that tells you when your backups stop being usable.
date: 2026-10-29
tag: Databases
---

Most backup jobs only prove that a file was written. They don't prove you can get your data back. The fix is cheap: restore the latest backup into a scratch database on a schedule, run a sanity query, and alert if anything fails.

## The idea

1. Take a backup in PostgreSQL's custom format with `pg_dump -Fc`.
2. Restore it into a throwaway database with `pg_restore`.
3. Check that a table you care about has rows.
4. Drop the scratch database and report success or failure.

## A minimal script

```bash
#!/usr/bin/env bash
set -euo pipefail

BACKUP="/backups/app_$(date +%F).dump"
SCRATCH="restore_test_$(date +%s)"

pg_dump -Fc -d app -f "$BACKUP"

createdb "$SCRATCH"
trap 'dropdb --if-exists "$SCRATCH"' EXIT

pg_restore --no-owner -d "$SCRATCH" "$BACKUP"

ROWS=$(psql -At -d "$SCRATCH" -c "SELECT count(*) FROM users;")
if [ "$ROWS" -lt 1 ]; then
  echo "Restore test failed: users table is empty" >&2
  exit 1
fi

echo "Restore test passed: $ROWS rows in users"
```

Run it from cron or a CI schedule. A non-zero exit code should page someone or post to your alerts channel.

## Things to adapt

- Change `app` and `users` to your own database and a table that should never be empty.
- Run the test on a separate host so a restore can't affect production.
- Record how long the restore took. That number is your real recovery time.
