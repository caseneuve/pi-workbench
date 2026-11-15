# pi-workbench

Personal workflow extensions for [Pi](https://pi.dev/), the [`@earendil-works/pi-coding-agent`](https://www.npmjs.com/package/@earendil-works/pi-coding-agent).

## Resources

- `extensions/diff-review.ts` — `/diff` plus `/diff-dirty`, `/diff-staged`, `/diff-latest`, and `/diff-vs-master`.
- `extensions/repo-todos.ts` — `/repo-todos` browser for add-todo-style project work items.
- `extensions/agent-journal.ts` — `/agent-journal` browser for `~/org/agent-journal`.
- `extensions/cwd-editor.ts` — `/cwd-editor` and Alt+E external-editor commands.
- `extensions/attach-screenshot.ts` — `/attach-screenshot` queue backed by `sxiv`.

Workbench exposes only these five extensions. Independent skills, prompts and authoring helpers belong to canonical **dotagents**, not this package. The browsers read shared Markdown/Org file conventions; they do not import or execute add-todo/org-journal helpers.

## Requirements and limitations

Requires Node >=22.19.0; development compatibility is tested against Pi 1.5.2 (host APIs are `*` peers, not a claim of every Pi version). The extensions preserve their existing Unix-oriented workflow:

- Git is required for diff review, todo-root fallback, and journal project detection.
- Diff review, repo-todos, agent-journal, and cwd-editor require `$VISUAL` or `$EDITOR` for editing.
- Screenshot selection requires `sxiv`; it uses `/tmp/screenshots` by default and does not provide macOS picker support.
- Canonical `ag-todo` and journal metadata helpers require [Babashka](https://babashka.org/); rebuilding the journal index requires Emacs with Org.
- The journal browser always reads `~/org/agent-journal/`. `ORG_JOURNAL_HOME` overrides only the canonical metadata helper's location, not the browser or default index root. Keep the default root for interoperability; an alternate index root requires explicit `shared-journal-base-dir` configuration.

## Install

Install a local checkout while developing:

```bash
pi install ~/git/pi/pi-workbench
# Or project-local (project resources load only after trust):
pi install -l ~/git/pi/pi-workbench
```

Local packages load in place; Pi does not install their dependencies. Run `npm ci` in a standalone checkout separately for development. **Do not run lifecycle/Prek installation or npm pack prepare in a linked worktree:** hooks are shared with its main checkout. Use standalone Git clones for normal lifecycle/pack validation; use `npm ci --ignore-scripts` if dependencies are needed in a linked worktree. `/reload` reloads installed resources. `pi update` updates Pi itself; `pi update --extensions` reconciles packages. A pinned Git source does not move to a different ref.

Install a reviewed immutable release in normal use:

```bash
pi install git:github.com/caseneuve/pi-workbench@<reviewed-commit-sha>
```

### Canonical independent skills and helpers

The native dotagents manifest provides five skills (`callgraph`, `dataflow`, `add-todo`, `org-journal`, `to-skill`) and five prompts (`ans`, `be-concise`, `handoff`, `speak-human`, `style`), with no extensions or themes. Install that **reviewed native checkout** alongside workbench:

```bash
DOTAGENTS=/absolute/path/to/reviewed-native-dotagents
pi install "$DOTAGENTS"
# Or in the chosen project, after reviewing its resources:
pi install -l "$DOTAGENTS"
```

Canonical independent resources are owned by the native dotagents package, not workbench. In its Pi-only layout they live under root `skills/` and `prompts/`. Do not also install old workbench skill copies or parallel runtime-specific copies and rely on discovery order: Pi warns on duplicate skill names and keeps the first. Legacy-source archival, regular-use soak and publication are separate from this ownership handoff.

Pi installation does not modify `PATH`. Workbench no longer owns `install-ag-todo-cli`/`uninstall-ag-todo-cli`; call the canonical helper directly from the target project (or use its `--dir` option):

```bash
"$DOTAGENTS/skills/add-todo/ag-todo" new --type chore --slug example --labels migration
"$DOTAGENTS/skills/add-todo/ag-todo" status 0001 in_progress
"$DOTAGENTS/skills/add-todo/ag-todo" list --status in_progress
ORG_JOURNAL_AGENT=pi bb "$DOTAGENTS/skills/org-journal/new-entry.bb" --mkdir
emacs --batch -Q -l "$DOTAGENTS/skills/org-journal/update-index.el"
```

The journal metadata helper returns EDN including `:path`, `:date`, `:project` and `:agent`; write the entry at `:path` using the canonical skill's Org template **before** rebuilding the index. Explicit `ORG_JOURNAL_AGENT=pi` preserves Pi identity regardless of checkout location. Resolve helpers beside the discovered canonical `SKILL.md`, not from workbench. No `~/.agents` installation, bootstrap or `~/.local/bin/ag-todo` shim is required. The helper travels with its skill; use its resolved path rather than depending on a global command.

`/repo-todos` reads `NNNN[.N]-slug.md` with title/status/priority/type/labels and relationship metadata; missing labels remain supported and `done`/`closed` retain distinct meanings. `/agent-journal` scans Org entries for TITLE/DATE/FILETAGS and `:LLM_PROJECT:`, excluding `index.org`. Authoring through the canonical helpers and browsing through workbench remain separate capabilities.

## Filtering

Filter resources independently with object package entries. Omit a key to load all manifest-allowed resources of that kind; use `[]` to load none:

```json
{
  "packages": [{
    "source": "git:github.com/caseneuve/pi-workbench@<reviewed-commit-sha>",
    "extensions": ["extensions/diff-review.ts", "extensions/repo-todos.ts"]
  }, {
    "source": "/absolute/path/to/reviewed-native-dotagents",
    "skills": ["skills/add-todo"],
    "prompts": []
  }]
}
```

Filters only narrow each manifest; they cannot restore workbench's removed skills or expose dotagents' retired experiments. Use `pi config` (or `pi config -l` for project-local settings) to enable or disable individual resources.

## Development

In a standalone clone:

```bash
npm ci
npm run check:ci
npm run typecheck
npm test
npm run test:coverage
npm run pack:check
```

`npm run check` applies Biome formatting and lint fixes. `npm run check:ci` is non-mutating. Extra local anti-slop checks are separate from portable package scripts/CI; no rules are vendored. Tooling policy was manually adopted from reviewed Copier master `0835070` (local/unpushed); original generation provenance remains in `.copier-answers.yml`, not a validated remote update. Canonical helper tests now belong to dotagents; workbench retains extension tests and structural ownership gates. Historical duplicate bytes remain available in Git at `0741860cb8d9a40946594fd4757f07177544b8d8`. Canonical skill ownership has been adopted by dotagents; regular-use soak, legacy-source archival and publication retain their separately agreed scope and approvals.

## License

[MIT](LICENSE), Copyright (c) 2026 Caseneuve.
