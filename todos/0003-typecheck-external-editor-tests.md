---
title: typecheck external editor tests
status: done
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

- [x] Type the test UI doubles against the supported generic `custom` contract.
- [x] Preserve all external-editor test scenarios and assertions.
- [x] `npm run typecheck` passes.

## Affected Files

- `test/external-editor.test.ts` — typed Pi UI test doubles.

## Notes

Detected during dotagents #0027.3 extraction. This is a strict-check compatibility repair, not part of the move-only extraction.

## Reconciliation (2026-11-15)

Approved migration `0005` supplied a typed generic `ExtensionUIContext.custom` fixture
that handles possibly asynchronous factories while preserving the external-editor
scenarios/assertions. Fresh current-main typecheck and the 42-test suite pass against
the selected Pi 1.5.2 contract; these tests are unchanged by the independent-skill
handoff in done `0006`. The historical Bun/0.85.1 extraction mismatch is not a remaining
failure or a request to downgrade the supported API.

Evidence: current `test/external-editor.test.ts`,
`~/.cache/pi-migration/evidence/workbench/review.md` typing/independent checks and
`todo-reconciliation/pi-workbench-checks.log` under that evidence root. No runtime
behavior redesign or broad test-coverage completion is claimed.
