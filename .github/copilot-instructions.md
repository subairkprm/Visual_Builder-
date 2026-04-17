# GitHub Copilot Instructions for Visual Builder

## Project Overview

**Visual Builder** is a Next.js/TypeScript application that helps non-technical users express software ideas through familiar visual analogies, then translates those analogies into structured technical project documentation.

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.9 (strict mode)
- **UI:** React 19 with Tailwind CSS 4
- **Testing:** Vitest 3
- **Linting:** ESLint 9 with Next.js config
- **Runtime:** Node.js 20+

## Architecture

### Core Concepts

1. **Analogy Templates:** Visual metaphors (irrigation, kitchen, construction, greenhouse) that represent software development stages
2. **Project Draft:** User-entered project information with selected analogy template
3. **Stage Timeline:** Visual and technical representation of project progression
4. **Technical Mirror:** Mapping of visual concepts to software architecture terms

### Directory Structure

```
app/          # Next.js app router pages and API routes
components/   # React components
lib/          # Business logic and utilities
types/        # TypeScript type definitions
tests/        # Vitest test files
docs/         # Documentation
```

### Key Files

- `types/project.ts` - Core type definitions for projects and analogies
- `lib/templates.ts` - Analogy template definitions and helpers
- `lib/storage.ts` - localStorage persistence layer
- `lib/project-helpers.ts` - Stage calculation and progress utilities
- `components/project-builder-dashboard.tsx` - Main application component

## Code Style Guidelines

### General Principles

- Follow existing patterns before introducing new abstractions
- Prefer small, focused functions with clear names
- Keep error handling explicit
- Avoid duplication when simple refactoring can remove it
- Use TypeScript strict mode - no `any` types

### React Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused on rendering
- Business logic belongs in `lib/` modules
- Use `"use client"` directive only when necessary

### File Naming

- Components: `kebab-case.tsx` (e.g., `project-builder-dashboard.tsx`)
- Utilities: `kebab-case.ts` (e.g., `project-helpers.ts`)
- Types: `kebab-case.ts` in `types/` directory
- Tests: `*.test.ts` matching the file being tested

### TypeScript

- Define explicit types for all function parameters and returns
- Use interfaces for object shapes, types for unions/aliases
- Prefer `type` for `AnalogyKey` and other literal unions
- Use `interface` for extendable object contracts
- Avoid optional chaining when values are guaranteed

### Testing

- Write tests for all business logic in `lib/`
- Test edge cases and error conditions
- Use descriptive test names: `it("returns null for corrupt JSON")`
- Mock browser APIs (localStorage, clipboard) in tests

## Development Workflow

### Before Making Changes

1. Read `AGENTS.md` for project-specific guidelines
2. Run existing tests: `npm run test`
3. Check types: `npm run typecheck`
4. Review related files to understand patterns

### Making Changes

1. Make the smallest change that solves the problem completely
2. Update tests for any behavior changes
3. Never remove tests unless behavior is intentionally removed
4. Add comments only where logic isn't self-evident

### Validation

Run all checks before committing:

```bash
npm run typecheck  # Type checking
npm run test       # Run tests
npm run lint       # Linting
npm run build      # Production build
```

All four commands must pass.

## Common Patterns

### State Management

Currently uses React `useState` with localStorage persistence. No global state library.

```typescript
const [draft, setDraft] = useState<ProjectDraft>(defaultProjectDraft);

// Load from storage on mount
useEffect(() => {
  const savedDraft = loadProjectDraft();
  if (savedDraft) setDraft(savedDraft);
}, []);
```

### Type Safety

All analogy keys are validated at runtime:

```typescript
function isAnalogyKey(value: unknown): value is AnalogyKey {
  return value === "irrigation" || value === "kitchen" || value === "construction";
}
```

### Stage Calculations

Always clamp stage indices to valid ranges:

```typescript
export function clampStageIndex(index: number, total: number) {
  return Math.min(Math.max(Math.trunc(index), 0), Math.max(total - 1, 0));
}
```

## What NOT to Do

- ❌ Do not add Python, FastAPI, or backend framework code (this is a Next.js project)
- ❌ Do not add new dependencies without clear justification
- ❌ Do not change architecture unless required by the task
- ❌ Do not expose secrets or credentials
- ❌ Do not skip tests for new features
- ❌ Do not use `any` type unless absolutely necessary
- ❌ Do not create files in `.next/` or `node_modules/`

## Current Phase

**Phase 1: Baseline Closure** - Stabilizing foundation and build infrastructure

See `docs/implementation-plan.md` for full roadmap.

## Getting Help

- Architecture questions: See `docs/architecture/v1-overview.md`
- Feature specs: See `docs/specs/`
- Agent guidelines: See `AGENTS.md`
- Implementation plan: See `docs/implementation-plan.md`

## Quick Reference

### Add a New Analogy Template

1. Add key to `AnalogyKey` type in `types/project.ts`
2. Add template object to `analogyTemplates` array in `lib/templates.ts`
3. Update `isAnalogyKey` validator in `lib/storage.ts`
4. Add tests for the new template
5. Update documentation

### Add a New Component

1. Create `component-name.tsx` in `components/`
2. Export the component as a named export
3. Import and use in parent component
4. Add unit tests if component has logic

### Add an API Route

1. Create `route.ts` in `app/api/[route-name]/`
2. Export `GET`, `POST`, etc. as async functions
3. Return `NextResponse` objects
4. Add tests in `tests/[route-name].test.ts`

## Notes for AI Assistants

- This project uses the Codex SDK for autonomous agent workflows
- Follow the patterns in `AGENTS.md` for structured task execution
- The app is designed to be extended with AI features in Phase 4
- Current focus is completing MVP output/export layer (Phase 2)
- All changes should maintain backward compatibility with existing localStorage data
