import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const securityTestDirectory = join(projectRoot, "tests", "security");

async function findRuleTests(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  const results = [];
  for (const file of files) {
    const path = join(directory, file.name);
    if (file.isDirectory()) results.push(...(await findRuleTests(path)));
    else if (file.isFile() && /\.(test|spec)\.m?js$/.test(file.name)) results.push(path);
  }
  return results;
}

const testFiles = await findRuleTests(securityTestDirectory);
if (testFiles.length === 0) {
  console.error("No Security Rules tests exist yet; refusing to report an empty suite as passed.");
  process.exit(2);
}

const quoteForShell = (value) => `'${value.replaceAll("'", "'\\''")}'`;
const paths = testFiles.map((path) => quoteForShell(relative(projectRoot, path)));
const testCommand = `node --test ${paths.join(" ")}`;
const result = spawnSync(
  "firebase",
  [
    "emulators:exec",
    "--config",
    "firebase.json",
    "--only",
    "firestore,storage",
    "--project",
    "demo-upsa-marketplace",
    testCommand,
  ],
  { cwd: projectRoot, stdio: "inherit" },
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}
process.exit(result.status ?? 1);
