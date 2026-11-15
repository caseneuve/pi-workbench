import type {
  ExtensionUIContext,
  KeybindingsManager,
  Theme,
} from "@earendil-works/pi-coding-agent";
import type { TUI } from "@earendil-works/pi-tui";
import { describe, expect, it } from "vitest";
import {
  openExternalEditor,
  parseEditorCommand,
} from "../extensions/shared/external-editor";

function editorUi(events: string[]): Pick<ExtensionUIContext, "custom"> {
  // SAFETY: the helper only calls these three terminal lifecycle methods.
  const tui = {
    stop: () => {
      events.push("stop");
    },
    start: () => {
      events.push("start");
    },
    requestRender: () => {
      events.push("render");
    },
  } as TUI;

  return {
    custom: (factory) =>
      new Promise((resolve) => {
        // SAFETY: the helper ignores theme/keybindings; only TUI lifecycle is used.
        Promise.resolve(
          factory(tui, {} as Theme, {} as KeybindingsManager, resolve),
        ).then((component) => expect(component.render(80)).toEqual([]));
      }),
  };
}

describe("parseEditorCommand", () => {
  it("preserves quoted empty arguments", () => {
    expect(
      parseEditorCommand('env TERM=xterm-ghostty-direct emacsclient -nw -a ""'),
    ).toEqual([
      "env",
      "TERM=xterm-ghostty-direct",
      "emacsclient",
      "-nw",
      "-a",
      "",
    ]);
  });

  it("rejects unterminated quotes", () => {
    expect(parseEditorCommand("emacsclient -a '")).toBeUndefined();
  });
});

describe("openExternalEditor", () => {
  it("stops and restarts the TUI around the child process", async () => {
    const events: string[] = [];

    const result = await openExternalEditor(
      editorUi(events),
      "true",
      "/tmp/editor-test",
    );

    expect(result).toEqual({ ok: true });
    expect(events).toEqual(["stop", "start", "render"]);
  });

  it("restarts and redraws the TUI after a non-zero editor exit", async () => {
    const events: string[] = [];
    await expect(
      openExternalEditor(editorUi(events), "false", "/tmp/editor-test"),
    ).resolves.toEqual({
      ok: false,
      message: "Editor exited with code 1",
    });
    expect(events).toEqual(["stop", "start", "render"]);
  });

  it("restarts and reports a missing editor executable", async () => {
    const events: string[] = [];

    const result = await openExternalEditor(
      editorUi(events),
      "/definitely/missing/pi-editor",
      "/tmp/editor-test",
    );

    expect(result.ok).toBe(false);
    expect(events).toEqual(["stop", "start", "render"]);
  });

  it("rejects an empty editor command without opening custom UI", async () => {
    const events: string[] = [];
    await expect(
      openExternalEditor(editorUi(events), "", "/tmp/editor-test"),
    ).resolves.toEqual({
      ok: false,
      message: "Invalid editor command",
    });
    expect(events).toEqual([]);
  });
});
