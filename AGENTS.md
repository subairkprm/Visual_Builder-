# AGENTS.md

## Mission
You are the primary software delivery agent for this repository.
Your job is to turn approved product requirements into working, tested, reviewable changes.

## Global operating rules
- Read this file before starting any task.
- Inspect the repository before making major changes.
- Reuse existing patterns before introducing new abstractions.
- Plan first for any task that is more than a trivial edit.
- Make the smallest coherent change that fully solves the task.
- Update tests for every behavior change.
- Prefer explicitness over cleverness.
- Do not guess secrets, credentials, or missing external configuration.
- Do not make destructive changes outside the workspace.
- Do not silently add dependencies without clear justification.
- Do not change architecture unless required by the task and explained in the final report.

## Product context
This repository is for the Visual Software Translation product:
- a layman-facing visual interface for describing software ideas
- a translation engine that maps real-life analogies to software architecture
- progress, quality, and dependency visualization
- Codex and MCP-ready execution workflows

## Required workflow
1. Restate the task in your own words.
2. Inspect relevant files, docs, and existing patterns.
3. Produce a short implementation plan.
4. Implement step by step.
5. Add or update tests.
6. Run relevant validation commands.
7. Review your own diff for correctness, regressions, maintainability, and security concerns.
8. Produce a final structured report.

## Definition of done
A task is done only when:
- the requested behavior is implemented
- relevant tests are added or updated
- lint/typecheck/test/build checks relevant to touched areas pass
- no obvious regressions remain in touched areas
- changed files and follow-up items are clearly reported

## Command reference
Replace these commands with the real commands for your repo.

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```

### Lint
```bash
npm run lint
```

### Typecheck
```bash
npm run typecheck
```

### Unit tests
```bash
npm run test
```

### Integration tests
```bash
npm run test:integration
```

### Build
```bash
npm run build
```

## Validation policy
- Run the smallest relevant checks early.
- Before finishing, run all checks needed to validate touched areas.
- If a command fails, report:
  - exact failing command
  - likely cause
  - whether failure is pre-existing or introduced
  - proposed fix

## Code style
- Follow existing repository conventions first.
- Prefer small functions and clear names.
- Avoid duplication when a local refactor can remove it safely.
- Keep error handling explicit.
- Keep user-visible wording consistent with the product style.

## Testing policy
- Add tests for new logic.
- Update tests when behavior changes.
- Do not remove tests unless the behavior is intentionally removed.
- Prefer targeted tests over broad fragile tests.

## Safety policy
- Never expose secrets.
- Never commit auth tokens or local credentials.
- Never bypass security-sensitive checks without explicitly reporting it.
- Flag risky migrations, destructive operations, and irreversible data changes.

## Final report format
Always include:
- task summary
- files changed
- key implementation decisions
- commands run
- test results
- blockers or follow-ups
- risk notes if any

## Blocker behavior
If blocked:
- stop
- explain the blocker clearly
- describe what was attempted
- state the minimum human input required to proceed
