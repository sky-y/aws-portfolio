import fs from "node:fs";
import path from "node:path";
import { applyEdits, modify } from "jsonc-parser";

const rootDir = process.cwd();

const targetsPath = path.join(rootDir, "lint-targets.json");
const vscodeSettingsPath = path.join(rootDir, ".vscode", "settings.json");

const targets = JSON.parse(
  fs.readFileSync(targetsPath, "utf8"),
);

const textlintTargets = targets.textlint?.include;

if (!Array.isArray(textlintTargets) || textlintTargets.length === 0) {
  throw new Error("lint-targets.json: textlint.include must be a non-empty array");
}

const targetPath = `{${textlintTargets.join(",")}}`;

fs.mkdirSync(path.dirname(vscodeSettingsPath), {
  recursive: true,
});

const currentSettings = fs.existsSync(vscodeSettingsPath)
  ? fs.readFileSync(vscodeSettingsPath, "utf8")
  : "{}\n";

const edits = modify(
  currentSettings,
  ["textlint.targetPath"],
  targetPath,
  {
    formattingOptions: {
      insertSpaces: true,
      tabSize: 2,
      eol: "\n",
    },
  },
);

const updatedSettings = applyEdits(currentSettings, edits);

fs.writeFileSync(vscodeSettingsPath, updatedSettings);

console.log(
  `Updated textlint.targetPath: ${targetPath}`,
);