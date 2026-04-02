---
name: plan_and_build
description: Inspect the repository, produce an implementation plan, and execute the work in small verified steps.
---

# Purpose
Use this skill when a task requires more than a trivial edit.

# Workflow
1. Read AGENTS.md.
2. Inspect the repository structure and relevant files.
3. Restate the task.
4. Produce a short implementation plan.
5. Identify the smallest complete change set.
6. Implement incrementally.
7. Update tests.
8. Run the smallest relevant checks first.
9. Expand to broader verification before completion.
10. Prepare a concise implementation summary.

# Rules
- Reuse existing patterns first.
- Avoid unnecessary dependencies.
- Keep changes localized.
- Do not skip tests for changed behavior.
- Report blockers precisely.

# Output checklist
- task restatement
- plan
- files changed
- tests updated
- commands run
- results
