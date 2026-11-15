---
title: format extracted typescript
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

`npm run check:ci` fails because Biome 2.3.5 would reformat every extracted TypeScript resource and several moved tests. Extraction preserves their source formatting; this release blocker tracks deliberate formatting migration separately.

## Acceptance Criteria

- [x] Decide whether Biome or the established TypeScript formatter is canonical for extracted extensions.
- [x] Apply the approved formatter consistently without behavior changes.
- [x] `npm run check:ci` passes with no formatting or Biome warnings.

## Affected Files

- `extensions/*.ts` and `extensions/shared/*.ts` — extracted extension formatting and import order.
- `test/*.test.ts` — moved extension tests.

## Notes

Detected during dotagents #0027.3 extraction. Do not silently reformat as part of the move-only extraction.

## Reconciliation (2026-11-15)

Resolved by approved migration `0005`: Biome is canonical, with a reviewed 80-column
override for extensions/tests preserving their established layout instead of forced
120-column churn. Focused import/union/unused-declaration fixes passed portable gates
without runtime redesign. Current reviewed main `60fd4a6` retains that configuration;
fresh `npm run check:ci` passes with no formatting errors or warnings (four informational
fixture suggestions only). No mutating formatter was run for this reconciliation.

Evidence: done `0005`, `~/.cache/pi-migration/evidence/workbench/review.md`,
`workbench-skill-handoff/review.md` and `todo-reconciliation/pi-workbench-checks.log`
under the same evidence root. This closes the stale Biome blocker, not inherited
central anti-slop debt or any broad coverage plan.
