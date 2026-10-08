import { cp, lstat, mkdir, rm } from "node:fs/promises";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const outputDirectory = join(projectRoot, "dist");
const sourceFolders = [
  "pages",
  "components",
  "styles",
  "services",
  "state",
  "utils",
  "config",
];
const browserFileExtensions = new Set([".html", ".css", ".js"]);

async function keepBrowserFiles(sourcePath) {
  const entry = await lstat(sourcePath);
  if (entry.isDirectory()) return true;
  return browserFileExtensions.has(extname(sourcePath).toLowerCase());
}

async function keepPublicAsset(sourcePath) {
  const entry = await lstat(sourcePath);
  return entry.isDirectory() || !sourcePath.endsWith(".gitkeep");
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const folder of sourceFolders) {
  await cp(join(projectRoot, "src", folder), join(outputDirectory, folder), {
    recursive: true,
    filter: keepBrowserFiles,
  });
}

for (const folder of ["assets", "favicon"]) {
  await cp(join(projectRoot, "public", folder), join(outputDirectory, folder), {
    recursive: true,
    filter: keepPublicAsset,
  });
}

await cp(
  join(projectRoot, "src", "pages", "public", "landing.html"),
  join(outputDirectory, "index.html"),
);

console.log("Static project files copied to dist/. No application functionality is added by this build step.");
