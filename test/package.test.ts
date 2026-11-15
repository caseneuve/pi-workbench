import { existsSync, readFileSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";

type ResourceKind = "extensions" | "skills" | "prompts" | "themes";

type PackageManifest = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  files: string[];
  keywords: string[];
  pi: Partial<Record<ResourceKind, string[]>>;
  scripts: Record<string, string>;
};

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// SAFETY: the package manifest is checked structurally below.
const packageJson = JSON.parse(
  readFileSync(resolve(repositoryRoot, "package.json"), "utf8"),
) as PackageManifest;

// Initial manifest entries are explicit paths, not globs. Adapt this test when
// deliberately adopting glob entries; npm pack remains the final shipping check.
test("declares existing in-package resources covered by the files allowlist", () => {
  expect(packageJson.keywords).toContain("pi-package");
  expect(Object.keys(packageJson.pi).length).toBeGreaterThan(0);
  expect(packageJson.files.length).toBeGreaterThan(0);

  for (const entries of Object.values(packageJson.pi)) {
    for (const entry of entries) {
      const path = resolve(repositoryRoot, entry);
      const local = relative(repositoryRoot, path);
      expect(isAbsolute(entry)).toBe(false);
      expect(local.startsWith("..")).toBe(false);
      expect(existsSync(path), entry).toBe(true);
      expect(
        packageJson.files.some((file) => {
          const shipped = relative(
            repositoryRoot,
            resolve(repositoryRoot, file),
          );

          return local === shipped || local.startsWith(`${shipped}${sep}`);
        }),
        `files must cover ${entry}`,
      ).toBe(true);
    }
  }
});

test("keeps host libraries out of runtime dependencies", () => {
  const hostPackages = [
    "@earendil-works/pi-coding-agent",
    "@earendil-works/pi-agent-core",
    "@earendil-works/pi-ai",
    "@earendil-works/pi-tui",
    "typebox",
  ];

  for (const host of hostPackages) {
    expect(packageJson.dependencies?.[host]).toBeUndefined();

    // Test-only host imports do not require a published peer.
    if (packageJson.peerDependencies?.[host]) {
      expect(packageJson.peerDependencies?.[host]).toBe("*");
    }
  }
});

test("provides development gates and ships the lifecycle helper", () => {
  for (const gate of [
    "check",
    "check:ci",
    "typecheck",
    "test",
    "test:coverage",
    "verify",
    "pack:check",
    "prepare",
  ]) {
    expect(packageJson.scripts[gate]).toBeTypeOf("string");
    expect(packageJson.scripts[gate].length).toBeGreaterThan(0);
  }

  expect(
    existsSync(resolve(repositoryRoot, "scripts/install-prek-hook.mjs")),
  ).toBe(true);
  expect(packageJson.files).toContain("scripts/install-prek-hook.mjs");
});

test("retains only the five workbench entrypoints", () => {
  expect(packageJson.pi.extensions).toEqual([
    "./extensions/diff-review.ts",
    "./extensions/repo-todos.ts",
    "./extensions/agent-journal.ts",
    "./extensions/cwd-editor.ts",
    "./extensions/attach-screenshot.ts",
  ]);
  for (const kind of ["skills", "prompts", "themes"] as const) {
    expect(packageJson.pi[kind]).toEqual([]);
    expect(packageJson.files).not.toContain(kind);
    expect(existsSync(resolve(repositoryRoot, kind))).toBe(false);
  }
});

test("leaves independent authoring helpers and CLI installation to dotagents", () => {
  for (const path of [
    "scripts/ag-todo-cli-installer.mjs",
    "scripts/ag-todo-cli-installer.test.mjs",
  ]) {
    expect(existsSync(resolve(repositoryRoot, path))).toBe(false);
    expect(packageJson.files).not.toContain(path);
  }
  for (const script of [
    "test:add-todo",
    "install-ag-todo-cli",
    "uninstall-ag-todo-cli",
  ]) {
    expect(packageJson.scripts[script]).toBeUndefined();
  }
});
