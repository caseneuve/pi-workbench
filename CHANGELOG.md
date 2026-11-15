# Changelog

## [Unreleased]

### Changed

- Target Pi 1.5.2 development APIs and Node >=22.19.0 with portable quality gates; keep local anti-slop checks separate.
- Stage independent add-todo/org-journal ownership in canonical native dotagents: remove workbench's duplicate skills and CLI installer; document native installation and direct canonical helper invocation. All five extension implementations remain unchanged. Active setup cutover and original-source retirement are separate approvals.

### Fixed

- Reject terminal-only browser/editor commands in non-TUI modes.
- Anchor inline diff comments after inserted lines correctly.
- Recognize enhanced-terminal Shift+S/G browser actions alongside legacy uppercase keys.

### Added

- Extracted personal workflow extensions and bundled add-todo and org-journal skills.
