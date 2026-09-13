import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const launcherName = "ag-todo";
const managedMarker = "# pi-workbench ag-todo launcher";

function shellQuote(value) {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

export function launcherPath(binDir) {
  return path.join(binDir, launcherName);
}

export function launcherContents(commandPath) {
  return `#!/bin/sh\n${managedMarker}\nexec ${shellQuote(commandPath)} "$@"\n`;
}

export function installLauncher({ binDir, commandPath, force = false }) {
  const destination = launcherPath(binDir);
  const contents = launcherContents(commandPath);

  fs.mkdirSync(binDir, { recursive: true });
  if (fs.existsSync(destination)) {
    const existing = fs.readFileSync(destination, "utf8");
    if (existing === contents) return destination;
    if (!force) {
      throw new Error(
        `${destination} already exists and is not this package's launcher; rerun with --force to replace it`,
      );
    }
  }
  fs.writeFileSync(destination, contents, { mode: 0o755 });
  fs.chmodSync(destination, 0o755);
  return destination;
}

export function uninstallLauncher({ binDir, commandPath }) {
  const destination = launcherPath(binDir);
  if (!fs.existsSync(destination)) return false;
  if (fs.readFileSync(destination, "utf8") !== launcherContents(commandPath)) {
    throw new Error(`${destination} is not this package's launcher; refusing to remove it`);
  }
  fs.unlinkSync(destination);
  return true;
}

function packagePaths() {
  const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  return {
    binDir: path.join(os.homedir(), ".local", "bin"),
    commandPath: path.join(packageRoot, "skills", "add-todo", "ag-todo"),
  };
}

export function runInstaller(args) {
  const [command, ...rest] = args;
  if (command === "install") {
    if (rest.some((arg) => arg !== "--force")) {
      console.error("Usage: npm run install-ag-todo-cli -- [--force]");
      return 1;
    }
    try {
      console.log(`Installed ${installLauncher({ ...packagePaths(), force: rest.includes("--force") })}`);
      return 0;
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      return 1;
    }
  }
  if (command === "uninstall") {
    if (rest.length > 0) {
      console.error("Usage: npm run uninstall-ag-todo-cli");
      return 1;
    }
    try {
      console.log(uninstallLauncher(packagePaths()) ? "Removed ag-todo launcher" : "ag-todo launcher is not installed");
      return 0;
    } catch (error) {
      console.error(error instanceof Error ? error.message : String(error));
      return 1;
    }
  }
  console.error("Usage: ag-todo-cli-installer.mjs {install|uninstall} [--force]");
  return 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exitCode = runInstaller(process.argv.slice(2));
}
