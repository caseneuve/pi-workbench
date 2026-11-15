import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { expect, it } from "vitest";

it.each(["", "**/.pi\n"])(
  "tracks reviewed Pi docs with global excludes %j but not local state",
  async (globalExcludes) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "workbench-ignore-"));

    const env = {
      ...process.env,
      GIT_CONFIG_GLOBAL: path.join(root, "global-config"),
      GIT_CONFIG_NOSYSTEM: "1",
    };

    try {
      const excludes = path.join(root, "global-ignore");
      await writeFile(excludes, globalExcludes);
      await writeFile(
        env.GIT_CONFIG_GLOBAL,
        `[core]\nexcludesFile = ${excludes}\n`,
      );
      await writeFile(
        path.join(root, ".gitignore"),
        await readFile(new URL("../.gitignore", import.meta.url), "utf8"),
      );
      await mkdir(path.join(root, ".pi/docs"), { recursive: true });
      await mkdir(path.join(root, ".pi/git"));
      await mkdir(path.join(root, "nested/.pi"), { recursive: true });
      await writeFile(path.join(root, "nested/.pi/settings.json"), "Private\n");
      await writeFile(path.join(root, ".pi/docs/review.md"), "Shared note\n");

      const localPaths = [".pi/settings.json", ".pi/mcp.json", ".pi/git/state"];

      for (const file of localPaths) {
        await writeFile(path.join(root, file), "Local state\n");
      }

      const git = (...args: string[]) =>
        execFileSync("git", args, { cwd: root, env, encoding: "utf8" });

      git("init", "-q");
      git("add", "--", ".pi/docs/review.md");

      expect(git("ls-files").trim()).toBe(".pi/docs/review.md");

      for (const file of localPaths) {
        expect(
          spawnSync("git", ["check-ignore", "--quiet", file], {
            cwd: root,
            env,
          }).status,
          file,
        ).toBe(0);
      }

      if (globalExcludes) {
        expect(
          spawnSync(
            "git",
            ["check-ignore", "--quiet", "nested/.pi/settings.json"],
            {
              cwd: root,
              env,
            },
          ).status,
        ).toBe(0);
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  },
);
