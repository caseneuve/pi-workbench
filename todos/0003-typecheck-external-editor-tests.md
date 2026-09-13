---
title: typecheck external editor tests
status: open
priority: high
type: chore
labels: [release-blocker]
created: 2026-09-13
parent: null
blocked-by: []
blocks: []
---

## Context

`npm run typecheck` fails in the moved `external-editor` test doubles: their `custom` methods do not satisfy the generic `ExtensionUIContext.custom` contract from the package's pinned Pi API. The canonical dotagents test used Bun and was outside its TypeScript check.

## Acceptance Criteria

- [ ] Type the test UI doubles against the supported generic `custom` contract.
- [ ] Preserve all external-editor test scenarios and assertions.
- [ ] `npm run typecheck` passes.

## Affected Files

- `test/external-editor.test.ts` — typed Pi UI test doubles.

## Notes

Detected during dotagents #0027.3 extraction. This is a strict-check compatibility repair, not part of the move-only extraction.
