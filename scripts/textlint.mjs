import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(
  new URL("../", import.meta.url),
);

const targetsPath = fileURLToPath(
  new URL("../lint-targets.json", import.meta.url),
);

const targets = JSON.parse(
  fs.readFileSync(targetsPath, "utf8"),
);

const textlintTargets = targets.textlint?.include;

if (!Array.isArray(textlintTargets) || textlintTargets.length === 0) {
  throw new Error(
    "lint-targets.json: textlint.include must be a non-empty array",
  );
}

const result = spawnSync(
  "npx",
  ["textlint", ...textlintTargets],
  {
    cwd: projectRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

process.exit(result.status ?? 1);