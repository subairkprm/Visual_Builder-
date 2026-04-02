# Visual Software Translation — Codex Starter Repo

This starter repository is set up for an end-to-end Codex workflow:

- `AGENTS.md` for durable repo instructions
- `.codex/config.toml` for Codex profiles
- reusable skills under `.agents/skills/`
- a JSON schema for structured run reports
- a starter GitHub Actions workflow for autonomous runs
- a first product task spec under `docs/specs/feature-request.md`

## Suggested next steps

1. Replace placeholder commands in `AGENTS.md` with your real repo commands.
2. Update `docs/specs/feature-request.md` with the current task.
3. Run a planning pass first, then an autonomous run.

## Recommended stack for V1

- Frontend: Next.js / React / Tailwind
- Backend: Node.js or Python
- Database: Supabase or Postgres
- Visual engine: JSON-based project model
- IDE integration: Codex + MCP

## Example autonomous run

```bash
codex exec --full-auto \
  --output-schema ./schemas/final-report.schema.json \
  -o ./artifacts/final-report.json \
  "Read AGENTS.md and implement docs/specs/feature-request.md completely."
```
