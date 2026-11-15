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

- Requires Node >=22.19.0. Use npm and the committed lockfile: `npm ci` for clean installs.
- Biome owns formatting and baseline linting. Use 2-space indentation; do not add Prettier or ESLint.
- `npm run check` may write safe Biome fixes; `npm run check:ci` must not modify files. Extra local anti-slop checks remain separate from package scripts and CI; do not vendor rules or install upstream tooling in this package.
- Prek installs through a guarded `prepare` script during development and runs the mutating Biome check before commits. Production-only Pi Git installs skip hook installation.
- `npm run typecheck` verifies the pinned development Pi API surface.
- Use Vitest for tests and V8 coverage for extension code.


## Ownership

Manually adopted the portable tooling policy from reviewed Copier master `08350707812e7036ab9477e879c1b029febd552b` (local/unpushed at adoption). `.copier-answers.yml` retains actual generation provenance; no remote Copier update was performed or validated. Application resources, tests, package metadata/lockfile, README, changelog and this file remain repository-owned. Shared tooling updates require review. Keep local `.pi/*` state untracked; `.pi/docs/` may contain reviewed shared notes.

## Engineering discipline

- Prefer TDD. If automated testing is impractical, document focused manual testing.
- Use FCIS: isolate pure planning, parsing, transformation, and formatting from filesystem, process, network, and UI side effects.
- Design extension code with precise TypeScript types.

- Apply KISS, DRY, and YAGNI.
- Preserve public commands, tools, shortcuts, resource paths, settings, and platform limitations unless an approved todo changes them.
- Keep imported Pi APIs in `peerDependencies` with a `"*"` range and pin them in `devDependencies` for type checking. Keep non-Pi runtime imports in `dependencies`.

- Keep the `pi` manifest explicit. Package filtering must be documented and experimental resources must be manifest-excluded.

## Release procedure

Use three-component unpadded CalVer `YYYY.M.D`; release tags are annotated `v<version>` tags. Agree on valid npm SemVer before a second same-day release; never append a fourth numeric component.

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
