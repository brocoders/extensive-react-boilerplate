const replace = require("../helpers/replace");
const path = require("path");
const fs = require("fs");

const removeInstallScripts = () => {
  replace({
    path: path.join(process.cwd(), "package.json"),
    actions: [
      {
        find: /\s*"app:config".*/g,
        replace: "",
      },
    ],
  });

  fs.rmSync(path.join(process.cwd(), ".install-scripts"), {
    recursive: true,
    force: true,
  });
};

module.exports = removeInstallScripts;
