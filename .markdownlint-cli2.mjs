import fs from "node:fs";
import { fileURLToPath } from "node:url";

const targetsPath = fileURLToPath(
  new URL("./lint-targets.json", import.meta.url),
);

const targets = JSON.parse(
  fs.readFileSync(targetsPath, "utf8"),
);

const markdownlintTargets = targets.markdownlint;

if (
  !markdownlintTargets ||
  !Array.isArray(markdownlintTargets.include) ||
  markdownlintTargets.include.length === 0
) {
  throw new Error(
    "lint-targets.json: markdownlint.include must be a non-empty array",
  );
}

export default {
  globs: markdownlintTargets.include,
  ignores: markdownlintTargets.exclude ?? [],
  gitignore: true,

  config: {
    default: true,

    MD003: {
      style: "atx",
    },

    MD004: {
      style: "dash",
    },

    MD013: false,

    MD024: {
      siblings_only: true,
    },

    MD029: {
      style: "one_or_ordered",
    },

    MD033: false,

    MD046: {
      style: "fenced",
    },

    MD048: {
      style: "backtick",
    },

    MD049: {
      style: "asterisk",
    },

    MD050: {
      style: "asterisk",
    },

    MD055: {
      style: "leading_and_trailing",
    },

    MD060: {
      style: "any",
    },
  },
};