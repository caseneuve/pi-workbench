---
title: Stage independent skill ownership handoff to canonical dotagents
status: in_progress
priority: high
type: chore
labels: [migration, ownership]
created: 2026-11-15
parent: null
blocked-by: []
blocks: []
---

## Scope and decisions

User-approved staged handoff ONLY on task/independent-skill-handoff from approved
master 0741860cb8d9a40946594fd4757f07177544b8d8. Canonical dotagents native
implementation 34374cc6b69e1aa7963de920623a1d1c7aa5f020 is independently approved;
final metadata closeout 1f127bd31aa84bb14372f75d9ab416aca431765e changes no implementation.
Use the staged native checkout, not the intentionally uncut-over original dotagents.

Remove duplicate add-todo/org-journal skills/exposure and only their CLI installer,
installer tests, package entries and obsolete documentation. Preserve original bytes
in baseline Git/history and external comparison evidence. Canonical runtime-neutral
instructions intentionally differ; compare helpers for behavior, not prose equality.
Browsers share Markdown/Org conventions, not executable helper dependencies.
Keep all five runtime entrypoints and shared runtime modules byte-identical to base.
Keep runtime scripts/install-prek-hook.mjs unchanged. No broad lint/coverage work.

No other repository edits, main merge/cutover, original-source retirement, active
configuration/auth/display/HOME changes, subagents, pushes, tags or publication.
The existing ~/.local/bin/ag-todo points to ORIGINAL dotagents, not workbench;
do not touch it. Ten original untracked coverage todos and active workbench stay
unchanged. Lifecycle/Prek/pack prepare run ONLY in standalone clones (linked-worktree
hooks are shared); commits must not invoke that shared hook.

## Acceptance criteria

- [ ] Structural tests enforce extension-only ownership, absent duplicate helpers/CLI
      installer surface, preserved explicit five entrypoints and shipped Prek helper.
- [ ] Baseline bytes retained in history/external inventory; canonical helper comparison
      documents launcher/identity/HOME/path differences and unchanged core/test bytes.
- [ ] README documents native canonical dotagents install, direct helper invocation,
      independent filters, shared file conventions, prerequisites and staged limits.
- [ ] Standalone baseline/candidate normal lifecycle, portable verify, V8 coverage,
      pack contents/production install and separate central changed-TS delta recorded.
      Inherited broad diagnostics are disclosed, not redesigned or claimed green.
- [ ] Actual isolated Pi1.5.2 native staged-pair personal/project-local discovery shows
      exactly five skills/five prompts, no duplicate warnings or retired resources;
      trust/filter/reload and actual repo-todos/journal browse/filter/export operate
      on artifacts produced using real canonical helpers. Inspect original Herdr PNGs
      and save helper commands/state/session artifacts, without host auth/display/config.
- [ ] Runtime tree/Prek helper, active/main status, original ten todo hashes and existing
      ag-todo symlink remain unchanged. No other repository edited.
- [ ] Independent review and acceptance precede done-only closeout. Whole coordinated
      ownership/cutover remains open; no main integration authorized here.

## Evidence

~/.cache/pi-migration/evidence/workbench-skill-handoff/; own sandbox
pi-live-proof-skill-handoff. Lead t16 receives exact SHA/plan/limits before edits.
Review requested from lead; no subagents launched by implementer.
