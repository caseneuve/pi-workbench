# pi-workbench

Personal workflow tools and bundled skills for [Pi](https://pi.dev/), the [`@earendil-works/pi-coding-agent`](https://www.npmjs.com/package/@earendil-works/pi-coding-agent).

## Resources

Extensions:

- `extensions/diff-review.ts` — `/diff` plus `/diff-dirty`, `/diff-staged`, `/diff-latest`, and `/diff-vs-master`.
- `extensions/repo-todos.ts` — `/repo-todos` browser for add-todo-style project work items.
- `extensions/agent-journal.ts` — `/agent-journal` browser for `~/org/agent-journal`.
- `extensions/cwd-editor.ts` — `/cwd-editor` and Alt+E external-editor commands.
- `extensions/attach-screenshot.ts` — `/attach-screenshot` queue backed by `sxiv`.

Skills:

- `skills/add-todo/` — todo schema guidance, the `ag-todo` Babashka CLI, source, and tests.
- `skills/org-journal/` — Org journal guidance plus entry and index helpers.

## Requirements and limitations

The extensions and helpers preserve their existing Unix-oriented workflow:

- Git is required for diff review, todo-root fallback, and journal project detection.
- Diff review, repo-todos, agent-journal, and cwd-editor require `$VISUAL` or `$EDITOR` for editing.
- Screenshot selection requires `sxiv`; it uses `/tmp/screenshots` by default and does not provide macOS picker support.
- `ag-todo` requires [Babashka](https://babashka.org/).
- Rebuilding the journal index requires Emacs.
- Journal entries remain in `~/org/agent-journal/`; set `ORG_JOURNAL_HOME` to override that helper location.

## Install

Install a local checkout while developing:

```bash
pi install ~/git/pi/pi-workbench
```

Install a reviewed immutable release in normal use:

```bash
pi install git:github.com/caseneuve/pi-workbench@<reviewed-commit-sha>
```

Pi package installation does not modify `PATH`. To install the package-owned `ag-todo` launcher explicitly, run this from the checkout or installed package directory:

```bash
npm run install-ag-todo-cli
```

This writes `~/.local/bin/ag-todo`, refuses to replace another launcher unless passed `-- --force`, and requires `~/.local/bin` on `PATH`. Remove only this package's launcher with:

```bash
npm run uninstall-ag-todo-cli
```

## Filtering

Filter resources with an object package entry. Omit a key to load all resources of that kind; use `[]` to load none:

```json
{
  "packages": [{
    "source": "git:github.com/caseneuve/pi-workbench@<reviewed-commit-sha>",
    "extensions": ["extensions/diff-review.ts", "extensions/repo-todos.ts"],
    "skills": []
  }]
}
```

Use `pi config` (or `pi config -l` for project-local settings) to enable or disable individual resources.

## Development

```bash
npm install
npm run check:ci
npm run typecheck
npm test
npm run test:add-todo
npm run pack:check
```

`npm run check` applies Biome formatting and lint fixes before running Oxlint. `npm run check:ci` is non-mutating. The add-todo helper test command is:

```bash
bb --config skills/add-todo/bb.edn -e '(require (quote todo.core-test) (quote clojure.test)) (clojure.test/run-tests (quote todo.core-test))'
```

## License

[MIT](LICENSE), Copyright (c) 2026 Caseneuve.
