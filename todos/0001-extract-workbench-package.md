---
title: extract pi-workbench from dotagents
status: in_progress
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
