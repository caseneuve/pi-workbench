# AGENTS.md — Pi package development

This repository contains a public Pi package for [pi-coding-agent](https://pi.dev/). Before changing code, read the relevant upstream Pi source and documentation in the installed `@earendil-works/pi-coding-agent` package, especially its package, extension, settings, and UI APIs. Treat the selected Pi API version as the compatibility contract.

## Development procedure

1. Discuss the problem and agree on scope.
2. Create or update a todo with concrete acceptance criteria. Record important design decisions and departures from the original plan in that todo.
3. Create a task branch; keep `master` stable.
4. Develop with checkpoint commits. Prefer red → green → refactor when testable.
5. Run checks, package validation, and installation checks, plus type checking, tests, and coverage.
6. Request peer review against the todo and this file.
7. Address findings in new commits, then merge only after approval.

Do not redesign behavior or expand platform support without an explicit todo.

## Tooling

- In a newly generated checkout, run `git init -b master && npm install` once, bootstrap anti-slop as described below, and commit the resulting `package-lock.json`. Thereafter use npm and the committed lockfile: `npm ci` for clean installs.
- Biome owns formatting and baseline linting. Oxlint runs additional extension checks for TypeScript extensions. Use 2-space indentation; do not add Prettier or ESLint.
- Bootstrap the current anti-slop rules through Dillon Mulroy's upstream skill; do not copy them from another checkout. If `tools/oxlint/anti-slop/index.ts` is absent, run `npx skills add dmmulroy/anti-slop --skill install-anti-slop`, then use the installed `install-anti-slop` skill to configure this repository before changing extension code. The downloaded plugin is local tooling and must remain untracked under `tools/oxlint/anti-slop/`; commit only repository-specific Oxlint configuration and dependency changes.
- `npm run check` may write safe Biome fixes and requires the locally installed anti-slop plugin. `npm run check:ci` must not modify files and intentionally runs only the committed Biome baseline; CI runs type checking and tests separately, but does not install or run anti-slop.
- Prek installs through a guarded `prepare` script during development and runs the mutating Biome check before commits. Production-only Pi Git installs skip hook installation.
- `npm run typecheck` verifies the pinned development Pi API surface.
- Use Vitest for tests and V8 coverage for extension code.


## Engineering discipline

- Prefer TDD. If automated testing is impractical, document focused manual testing.
- Use FCIS: isolate pure planning, parsing, transformation, and formatting from filesystem, process, network, and UI side effects.
- Design extension code with precise TypeScript types.

- Apply KISS, DRY, and YAGNI.
- Preserve public commands, tools, shortcuts, resource paths, settings, and platform limitations unless an approved todo changes them.
- Keep imported Pi APIs in `peerDependencies` with a `"*"` range and pin them in `devDependencies` for type checking. Keep non-Pi runtime imports in `dependencies`.

- Keep the `pi` manifest explicit. Package filtering must be documented and experimental resources must be manifest-excluded.

## Release procedure

Use npm-compatible CalVer `YYYY.M.D[.PATCH]`; release tags are annotated `v<version>` tags.

1. Complete automated checks and focused local/Git install validation.
2. Update `CHANGELOG.md` and `package.json`.
3. Merge approved work.
4. Create and push the annotated release tag.
5. Verify installation using that immutable tag or its reviewed commit SHA.

## Review checklist

Reviewers must check:

- Conformance to the todo and acceptance criteria.
- Test coverage and manual-test evidence where appropriate.
- Manifest/resource paths, filtering, local installation, and immutable Git installation.
- Pi API compatibility, peer/runtime dependency placement, and package contents from `npm pack --dry-run`.
- FCIS, modularity, KISS, DRY, and YAGNI discipline.
- Preservation of public behavior and documented platform limits.
- For visible UI changes, screenshot review unless a human explicitly waives it.
