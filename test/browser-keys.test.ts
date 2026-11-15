import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { Theme } from "@earendil-works/pi-coding-agent";
import { afterEach, expect, it } from "vitest";
import { AgentJournalComponent } from "../extensions/agent-journal";
import { RepoTodosComponent } from "../extensions/repo-todos";

const roots: string[] = [];

const partialTheme: Partial<Theme> = {
  fg: (_token, text) => text,
  bg: (_token, text) => text,
  bold: (text) => text,
  getBgAnsi: () => "",
};
// SAFETY: these browser fixtures only use identity style methods in this theme.

const theme = partialTheme as Theme;

afterEach(async () => {
  await Promise.all(
    roots.splice(0).map((root) => rm(root, { recursive: true })),
  );
});

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "workbench-keys-"));
  roots.push(root);

  return root;
}

it.each(["G", "\x1b[103;2u"])(
  "repo-todos %j selects the last row",
  async (key) => {
    const root = await fixture();
    await mkdir(path.join(root, "todos"));

    for (const id of ["0001", "0002"]) {
      await writeFile(
        path.join(root, "todos", id + "-fixture.md"),
        "---\ntitle: Fixture " + id + "\nstatus: open\n---\n",
      );
    }

    let exported = "";

    const component = new RepoTodosComponent(
      root,
      theme,
      () => {},
      (payload) => {
        exported = payload?.text ?? "";
      },
      async () => {},
    );

    await component.init();
    component.handleInput(key);
    component.handleInput("m");
    component.handleInput("q");

    expect(exported).toContain("0002-fixture.md");
    expect(exported).not.toContain("0001-fixture.md");
  },
);

it.each(["S", "\x1b[115;2u"])("repo-todos %j cycles sort backwards", (key) => {
  const component = new RepoTodosComponent(
    ".",
    theme,
    () => {},
    () => {},
    async () => {},
  );

  component.handleInput(key);

  expect(component.render(100).join("\n")).toContain("sort:labels");
});

it.each(["G", "\x1b[103;2u"])(
  "agent-journal %j selects the last row",
  async (key) => {
    const root = await fixture();

    for (const [name, date] of [
      ["new", "2026-11-15 09:00"],
      ["old", "2026-11-14 09:00"],
    ]) {
      await writeFile(
        path.join(root, name + ".org"),
        "#+TITLE: " + name + "\n#+DATE: " + date + "\n",
      );
    }

    let exported = "";

    const component = new AgentJournalComponent(
      root,
      null,
      theme,
      () => {},
      (payload) => {
        exported = payload?.text ?? "";
      },
      async () => {},
    );

    await component.init();
    component.handleInput(key);
    component.handleInput("m");
    component.handleInput("q");

    expect(exported).toContain("old.org");
    expect(exported).not.toContain("new.org");
  },
);
