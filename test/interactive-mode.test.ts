import type {
  ExtensionAPI,
  ExtensionCommandContext,
  ExtensionUIContext,
} from "@earendil-works/pi-coding-agent";
import { describe, expect, it, vi } from "vitest";
import agentJournal from "../extensions/agent-journal";
import cwdEditor from "../extensions/cwd-editor";
import diffReview from "../extensions/diff-review";
import repoTodos from "../extensions/repo-todos";

describe.each([
  ["diff", diffReview],
  ["cwd-editor", cwdEditor],
  ["repo-todos", repoTodos],
  ["agent-journal", agentJournal],
] as const)("/%s terminal-only UI", (commandName, extension) => {
  it.each(["rpc", "json", "print"] as const)(
    "rejects %s before any file/editor/custom UI side effects",
    async (mode) => {
      const registerCommand = vi.fn<ExtensionAPI["registerCommand"]>();

      const pi: Partial<ExtensionAPI> = {
        registerCommand,
        registerShortcut: vi.fn<ExtensionAPI["registerShortcut"]>(),
      };

      // SAFETY: these factories only register commands/shortcuts during loading.
      extension(pi as ExtensionAPI);

      const command = registerCommand.mock.calls.find(
        ([name]) => name === commandName,
      )?.[1];

      expect(command).toBeDefined();

      const notify = vi.fn<ExtensionUIContext["notify"]>();
      const partialUi: Partial<ExtensionUIContext> = { notify };
      // SAFETY: the non-TUI guard only uses notify; missing UI methods must not run.
      const ui = partialUi as ExtensionUIContext;

      // SAFETY: non-TUI context deliberately lacks services; guard must run first.
      const ctx = {
        mode,
        hasUI: mode === "rpc",
        ui,
      } as ExtensionCommandContext;

      await command?.handler("", ctx);

      expect(notify).toHaveBeenCalledExactlyOnceWith(
        `/${commandName} requires interactive mode`,
        "error",
      );
    },
  );
});
