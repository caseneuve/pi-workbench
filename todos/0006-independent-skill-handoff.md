---
title: Stage independent skill ownership handoff to canonical dotagents
status: done
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

- [x] Structural tests enforce extension-only ownership, absent duplicate helpers/CLI
      installer surface, preserved explicit five entrypoints and shipped Prek helper.
- [x] Baseline bytes retained in history/external inventory; canonical helper comparison
      documents launcher/identity/HOME/path differences and unchanged core/test bytes.
- [x] README documents native canonical dotagents install, direct helper invocation,
      independent filters, shared file conventions, prerequisites and staged limits.
- [x] Standalone baseline/candidate normal lifecycle, portable verify, V8 coverage,
      pack contents/production install and separate central changed-TS delta recorded.
      Inherited broad diagnostics are disclosed, not redesigned or claimed green.
- [x] Actual isolated Pi1.5.2 native staged-pair personal/project-local discovery shows
      exactly five skills/five prompts, no duplicate warnings or retired resources;
      trust/filter/reload and actual repo-todos/journal browse/filter/export operate
      on artifacts produced using real canonical helpers. Inspect original Herdr PNGs
      and save helper commands/state/session artifacts, without host auth/display/config.
- [x] Runtime tree/Prek helper, active/main status, original ten todo hashes and existing
      ag-todo symlink remain unchanged. No other repository edited.
- [x] Independent review and acceptance precede done-only closeout. Whole coordinated
      ownership/cutover remains open; no main integration authorized here.

## Evidence

~/.cache/pi-migration/evidence/workbench-skill-handoff/; own sandbox
pi-live-proof-skill-handoff. Lead t16 receives exact SHA/plan/limits before edits.
Review requested from lead; no subagents launched by implementer.

## Scoped acceptance / results

Lead t16 accepted the staging evidence, conditional on independent exact-SHA approval.
Reviewer t3v APPROVED implementation 8192336f282d74250d6810013a68c7d7ad93765d
for staging only: evidence/workbench-skill-handoff/{handoff,review}.md. This closeout
changes only this manifest-excluded todo; no shipped/runtime changes or full retest
claim. Reviewer separately checks final metadata diff and shipped-tree equality.

Portable baseline/candidate verify PASS44/42 (three obsolete installer tests removed,
one structural test added), coverage unchanged44.59% statements (screenshot0% remains),
pack PASS23/12. Canonical helper core10 tests/46 assertions and portable helpers2 PASS.
All lifecycle/pack/Prek checks ran only in standalone clones; shared canonical hook
unchanged. Two newly introduced test-spacing findings were fixed in819; separate
central changed TS PASS0, broad inherited FAIL553 vs577 (24 deleted CLI diagnostics),
zero new final diagnostic tuples. No broad lint/coverage redesign or vendoring.

Native actual staged pair on Pi1.5.2 PASS exact5 skills/5 prompts, no duplicates/retired
resources, personal/local trust/filter/reload and exact immutable local Git production
installation. Real canonical helper-produced todos and metadata-supplied Org entries
were read, filtered and exported by actual unchanged workbench browsers; six original
Herdr PNGs inspected. Org body filled by explicit evidence orchestration, not AI prose;
no provider calls or autonomous skill-execution claim. Actual in-memory session shell
entries saved; no persisted-conversation/resume claim. Own sandbox/terminals cleaned.

Lead integrated canonical dotagents during this task to actual3751a530ac8943478b573fbdcb60f6874fc7032b,
whose tree is identical to approved1f127bd. No implementer edit in that repository.
Original duplicate bytes preserved in Git074 and external archive/comparison evidence.
All five runtime entries/two shared modules/Prek helper/lock/provenance match074 exactly;
active workbench, ten original untracked todos, existing ag-todo link and original
active dotagents remain unchanged.

**Only this staged handoff is done.** Active adoption, loader reconciliation, launcher
decisions, coordinated main integration, soak and physical original-source retirement
remain open under separate lead/user approval. No main merge/cutover, push/tag/publication
or whole ownership-cutover completion is authorized or claimed.
