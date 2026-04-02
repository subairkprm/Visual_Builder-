# Autonomous Runbook

## Planning pass
```bash
codex --profile planning
```

Then prompt:

```text
Read AGENTS.md and docs/specs/feature-request.md. Inspect the repo and produce an implementation plan only. Do not modify files yet.
```

## Autonomous execution
```bash
codex exec --full-auto \
  --output-schema ./schemas/final-report.schema.json \
  -o ./artifacts/final-report.json \
  "Read AGENTS.md and implement docs/specs/feature-request.md completely."
```

## Review
Check:
- code diff
- tests
- artifacts/final-report.json
