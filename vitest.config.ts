import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["extensions/**/*.ts"],
      exclude: ["extensions/**/*.d.ts"],
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage"
    }
  }
});
