import { execSync } from "child_process";

export const run = (cmd: string): void => {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
};

export const capture = (cmd: string): string =>
  execSync(cmd, { encoding: "utf8" });
