module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "fix",
        "feat",
        "build",
        "chore",
        "ci",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
      ],
    ],
    "type-empty": [2, "never"],
    "subject-empty": [2, "never"],
    "subject-case": [0],
  },
  messages: {
    "type-enum":
      "⚠️ Invalid type prefix. Please use one of the following: fix, feat, build, chore, ci, docs, style, refactor, perf, test.",
  },
};
