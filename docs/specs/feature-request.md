# Feature Request

## Title
Create the project intake screen

## Objective
Build a project intake screen where a user can enter project name, objective, target users, preferred analogy template, and desired environment.

## Business context
This is the first step of the Visual Software Translation product. It is the entry point for converting a layman description into structured software planning.

## User outcome
The user can create a project draft through a simple form and proceed to the visual story map.

## Scope
- input form
- validation
- submit handler
- saved local state or mocked persistence
- tests

## Out of scope
- authentication
- production database
- external integrations

## Technical constraints
- use existing UI patterns
- do not add new dependencies unless necessary
- keep the screen implementation compatible with future MCP/Codex workflows

## Acceptance criteria
- user can enter all required fields
- validation prevents empty submission
- submission success state is visible
- saved draft can be reloaded in local state
- tests cover the main flow

## Notes
Analogy template starter options should include:
- irrigation system
- restaurant kitchen
- building construction
