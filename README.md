# Visual Software Translation — Codex Starter Repo

This repository now contains two layers:

- a Codex-ready operating structure
- a first working V1 app scaffold for the Visual Builder concept

## Current status

The repo includes:

- `AGENTS.md` for durable repo instructions
- `.codex/config.toml` for Codex profiles
- reusable skills under `.agents/skills/`
- a JSON schema for structured run reports
- a starter GitHub Actions workflow for autonomous runs
- a first product task spec under `docs/specs/feature-request.md`
- a basic Next.js app scaffold with the intake flow, visual story map, technical mirror, and progress overview

## Suggested next steps

1. Run `npm install`
2. Run `npm run typecheck`
3. Run `npm run test`
4. Run `npm run build`
5. Replace local-state persistence with a real backend when the shell is stable

## Stack

- Next.js 15
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- Vitest 3

## Example autonomous run

```bash
codex exec --full-auto \
  --output-schema ./schemas/final-report.schema.json \
  -o ./artifacts/final-report.json \
  "Read AGENTS.md and implement docs/specs/feature-request.md completely."
```
