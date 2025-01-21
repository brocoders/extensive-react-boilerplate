const { execSync } = require("child_process");

const collectPromisesResults = (callback) => async (prevValues) => {
  const results = await callback(prevValues);

  return { ...prevValues, ...results };
};

module.exports = {
  prompt: async ({ prompter, args }) => {
    if (Object.keys(args).length) {
      return Promise.resolve({
        name: args.name,
        property: args.property,
        kind: args.kind,
        type: args.type,
        referenceType: args.referenceType,
        propertyForSelect: args.propertyForSelect,
        isOptional: args.isOptional === "true",
        isShowInTable: args.isShowInTable === "true",
      });
    }

    const result = await prompter
      .prompt({
        type: "input",
        name: "name",
        message: "Entity name (e.g. 'User')",
        validate: (input) => {
          if (!input.trim()) {
            return "Entity name is required";
          }

          return true;
        },
        format: (input) => {
          return input.trim();
        },
      })
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: "input",
            name: "property",
            message: "Property name (e.g. 'firstName')",
            validate: (input) => {
              if (!input.trim()) {
                return "Property name is required";
              }

              return true;
            },
            format: (input) => {
              return input.trim();
            },
          });
        })
      )
      .then(
        collectPromisesResults((rootValues) => {
          return prompter
            .prompt({
              type: "select",
              name: "kind",
              message: "Select kind of type",
              choices: [
                {
                  message: "Primitive and Date (string, number, Date, etc)",
                  value: "primitive",
                },
                { message: "Reference to entity", value: "reference" },
              ],
            })
            .then(
              collectPromisesResults((values) => {
                if (values.kind === "reference") {
                  return prompter
                    .prompt({
                      type: "input",
                      name: "type",
                      message: "Entity name (e.g. 'File')",
                      validate: (input) => {
                        if (!input.trim()) {
                          return "Entity name is required";
                        }

                        return true;
                      },
                      format: (input) => {
                        return input.trim();
                      },
                    })
                    .then(
                      collectPromisesResults((referenceValues) => {
                        return prompter
                          .prompt({
                            type: "select",
                            name: "referenceType",
                            message: "Select type of reference",
                            choices: [
                              {
                                message: `Single. ${rootValues.property}: ${referenceValues.type}`,
                                value: "toOne",
                              },
                              {
                                message: `Multiple. ${rootValues.property}: ${referenceValues.type}[]`,
                                value: "toMany",
                              },
                            ],
                          })
                          .then(
                            collectPromisesResults((referenceTypeValues) => {
                              if (referenceValues.type !== "File") {
                                return prompter.prompt({
                                  type: "input",
                                  name: "propertyForSelect",
                                  message: `Property name in ${referenceValues.type} for select (e.g. 'name')`,
                                  validate: (input) => {
                                    if (!input.trim()) {
                                      return `Property name in ${referenceValues.type} for select is required`;
                                    }

                                    return true;
                                  },
                                  format: (input) => {
                                    return input.trim();
                                  },
                                });
                              }

                              return referenceTypeValues;
                            })
                          );
                      })
                    );
                }

                return prompter.prompt({
                  type: "select",
                  name: "type",
                  message: "Property type",
                  choices: ["string", "number", "boolean", "Date"],
                });
              })
            );
        })
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: "confirm",
            name: "isOptional",
            message: "Is the property optional?",
            initial: true,
          });
        })
      )
      .then(
        collectPromisesResults(() => {
          return prompter.prompt({
            type: "confirm",
            name: "isShowInTable",
            message: "Do we need to show the field in the list?",
            initial: true,
          });
        })
      );

    if (!result.propertyForSelect) {
      result.propertyForSelect = "";
    }

    return result;
  },
};
