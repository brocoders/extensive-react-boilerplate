// eslint-disable-next-line @typescript-eslint/no-require-imports
const inflection = require("inflection");

module.exports = {
  templates: `${__dirname}/.hygen`,
  helpers: {
    pascalName: (name) => inflection.camelize(inflection.underscore(name)),
    pascalPluralName: (name) =>
      inflection.camelize(inflection.underscore(inflection.pluralize(name))),
  },
};
