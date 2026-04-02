---
name: review_and_verify
description: Review the final diff, validate correctness, run checks, and produce the final delivery report.
---

# Purpose
Use this skill before declaring work complete.

# Workflow
1. Review changed files for correctness.
2. Review for regressions in touched areas.
3. Review for security, configuration, and dependency risks.
4. Run required validation commands from AGENTS.md.
5. Confirm that done criteria are satisfied.
6. Produce a structured final report.

# Review focus
- correctness
- maintainability
- consistency with repo patterns
- test adequacy
- user-visible impact
- migration or deployment risks

# Final report checklist
- summary
- files changed
- commands run
- pass/fail outcomes
- unresolved issues
- follow-up recommendations
