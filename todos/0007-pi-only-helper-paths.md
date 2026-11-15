---
title: document canonical Pi-only skill helper paths
status: in_progress
priority: medium
type: docs
labels: [pi, packaging]
created: 2026-11-15
parent: null
blocked-by: []
blocks: []
---

## Scope

Follow dotagents task0069: canonical skills move from shared/skills/ to skills/.
Users install native Pi packages only; helpers live beside SKILL.md and require no
bootstrap, ~/.agents tree or PATH shim. The previous staged-only ownership handoff
has already been adopted. This task changes documentation, not any extension.

## Acceptance

- [ ] Helper examples and package skill filters use skills/ paths in the reviewed
  Pi-only dotagents layout.
- [ ] Remove obsolete staged-only adoption and legacy launcher-preservation claims;
  explain direct skill-relative helper invocation without installation shims.
- [ ] Independent review confirms exact README/todo scope and no changes to runtime
  sources, package metadata, hooks, or the ten original untracked coverage todos.

## Boundaries

No runtime/API changes or new dependency/lifecycle installation. No implication of
publication, completed soak or general legacy-source deletion. Integrate only with
the reviewed dotagents root-layout change. Existing unrelated package filters remain
supported even though the user's normal setup is simplifying to plain declarations.
