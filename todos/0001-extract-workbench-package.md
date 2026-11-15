---
title: extract pi-workbench from dotagents
status: closed
priority: high
type: refactor
labels: [extraction]
created: 2026-09-13
parent: null
blocked-by: []
blocks: []
---

## Context

Move the confirmed pi-workbench resources from dotagents without redesigning behavior. Source todo: dotagents #0027.3.

## Acceptance Criteria

- [ ] Package the five confirmed extensions, shared editor helpers, add-todo skill/CLI, and org-journal skill/helpers.
- [ ] Preserve commands, shortcuts, schemas, journal location, queue semantics, and documented Linux/macOS limitations.
- [ ] Make ag-todo resolve package-local Babashka configuration and provide explicit launcher install/uninstall commands.
- [ ] Pass canonical package checks or record strict-check failures as release-blocking destination todos.
- [ ] Validate package contents and package-install forms without retiring dotagents sources.
- [ ] Record the canonical GitHub Copier source and pin development against the current Pi API release.

## Affected Files

- `extensions/` - extracted extension resources and helpers
- `skills/` - extracted skills and bundled helper implementations
- `scripts/` - package-owned ag-todo launcher installation
- `test/` - moved canonical tests and package-boundary tests

## Notes

Manual testing by the requester is the release gate. Do not push, merge, release, or retire dotagents sources.

The post-extraction dirty changes are the template-owned portion of the Copier v0.3.0 update. `package.json` is repository-owned after initial generation, so its `check:ci` adjustment was made manually to stay consistent with the updated package-boundary test. Keep those updates, but normalize `_src_path` to the public HTTPS GitHub source rather than the machine-local template checkout. The initial-copy-only `skill_name` answer remains removed now that the generated scaffold has been replaced by the extracted, repository-owned `add-todo` skill.

## Reconciliation (2026-11-15)

Closed as superseded bundled-owner scope. Initial extraction and five-extension
compatibility were delivered and approved under done `0005` / master `0741860`.
Done `0006` / reviewed `60fd4a6004ecd9042e1b61da81d1f8ad94ccf6e4`, now adopted by
lead fast-forward after user manual acceptance, deliberately hands independent
authoring ownership to canonical native dotagents. That supersedes this ticket's
bundled-skills/package-owned CLI-installer contract; do not restore duplicates to
satisfy the historical unchecked boxes.

All five runtime entrypoints, two shared modules and Prek helper are byte-preserved.
Current workbench exposes extensions only and packs 12 files. Reviewed actual canonical
helper artifacts are browsable/exportable through the real workbench commands;
paired native discovery is unique five skills/five prompts with independent filters,
trust and reload. Fresh non-mutating check:ci/typecheck/tests pass (42 tests).
Evidence: `~/.cache/pi-migration/evidence/workbench/review.md`,
`workbench-skill-handoff/{review,handoff}.md` and
`todo-reconciliation/pi-workbench-checks.log` under the same evidence root.

Original duplicate bytes remain recoverable at `0741860` and in external preservation
archives. The ten untracked coverage plans are untouched. This closure does not
complete broad coverage, source retirement/soak or publication, and does not claim a
remote Copier update or authorize further source/settings changes.
