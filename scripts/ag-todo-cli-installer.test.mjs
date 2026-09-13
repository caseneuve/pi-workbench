import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, expect, test } from "vitest";
import { installLauncher, launcherContents, launcherPath, uninstallLauncher } from "./ag-todo-cli-installer.mjs";

const temporaryRoots = [];

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) fs.rmSync(root, { force: true, recursive: true });
});

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "pi-workbench-ag-todo-"));
  temporaryRoots.push(root);
  return {
    binDir: path.join(root, ".local", "bin"),
    commandPath: path.join(root, "skills", "add-todo", "ag-todo"),
  };
}

test("installs an executable package-owned ag-todo launcher", () => {
  const options = fixture();
  const destination = installLauncher(options);

  expect(destination).toBe(launcherPath(options.binDir));
  expect(fs.readFileSync(destination, "utf8")).toBe(launcherContents(options.commandPath));
  expect(fs.statSync(destination).mode & 0o111).not.toBe(0);
});

test("is idempotent and protects a different launcher", () => {
  const options = fixture();
  installLauncher(options);
  expect(installLauncher(options)).toBe(launcherPath(options.binDir));

  fs.writeFileSync(launcherPath(options.binDir), "#!/bin/sh\necho user launcher\n");
  expect(() => installLauncher(options)).toThrow("already exists");
  expect(() => installLauncher({ ...options, force: true })).not.toThrow();
});

test("uninstalls only its own launcher", () => {
  const options = fixture();
  installLauncher(options);

  expect(uninstallLauncher(options)).toBe(true);
  expect(uninstallLauncher(options)).toBe(false);

  fs.mkdirSync(options.binDir, { recursive: true });
  fs.writeFileSync(launcherPath(options.binDir), "#!/bin/sh\necho user launcher\n");
  expect(() => uninstallLauncher(options)).toThrow("refusing to remove");
});
