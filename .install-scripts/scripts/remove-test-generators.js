const replace = require("../helpers/replace");
const path = require("path");
const fs = require("fs");

const removeTestGenerators = () => {
  replace({
    path: path.join(process.cwd(), "package.json"),
    actions: [
      {
        find: /\s*"test:generators:static".*/g,
        replace: "",
      },
      {
        find: /\s*"test:e2e:generators:crud".*/g,
        replace: "",
      },
    ],
  });

  fs.rmSync(path.join(process.cwd(), "playwright-tests", "generators"), {
    recursive: true,
    force: true,
  });
  fs.rmSync(path.join(process.cwd(), "playwright.config.generators.ts"), {
    force: true,
  });
  fs.rmSync(path.join(process.cwd(), "playwright.config.generators-crud.ts"), {
    force: true,
  });
  fs.rmSync(path.join(process.cwd(), ".github", "workflows", "cli.yml"), {
    force: true,
  });
};

module.exports = removeTestGenerators;
