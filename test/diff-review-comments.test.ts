import { expect, it } from "vitest";
import { parseReviewComments } from "../extensions/diff-review";

it("anchors a pure inserted editor comment to the preceding added diff line", () => {
  const base = [
    "diff --git a/review.txt b/review.txt",
    "index 111..222 100644",
    "--- a/review.txt",
    "+++ b/review.txt",
    "@@ -1,2 +1,2 @@",
    " baseline alpha",
    "-baseline beta",
    "+changed beta for review",
    "",
  ].join("\n");

  expect(
    parseReviewComments(base, "@@ -8,0 +9 @@\n+Please explain this change.\n"),
  ).toEqual([
    {
      file: "review.txt",
      hunk: "@@ -1,2 +1,2 @@",
      oldLine: 2,
      newLine: 2,
      body: "Please explain this change.",
    },
  ]);
});
