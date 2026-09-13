---
title: format extracted typescript
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

`npm run check:ci` fails because Biome 2.3.5 would reformat every extracted TypeScript resource and several moved tests. Extraction preserves their source formatting; this release blocker tracks deliberate formatting migration separately.

## Acceptance Criteria

- [ ] Decide whether Biome or the established TypeScript formatter is canonical for extracted extensions.
- [ ] Apply the approved formatter consistently without behavior changes.
- [ ] `npm run check:ci` passes with no formatting or Biome warnings.

## Affected Files

- `extensions/*.ts` and `extensions/shared/*.ts` — extracted extension formatting and import order.
- `test/*.test.ts` — moved extension tests.

## Notes

Detected during dotagents #0027.3 extraction. Do not silently reformat as part of the move-only extraction.
