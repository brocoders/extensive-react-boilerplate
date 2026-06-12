import { test, expect } from "@playwright/test";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { entityPaths, entityRouteSegment, matrix } from "./fixtures/matrix";
import type { GeneratedEntity, GeneratedProperty } from "./fixtures/matrix";

const REPO_ROOT = resolve(__dirname, "..", "..");
const SRC = resolve(REPO_ROOT, "src");

const readFile = (absPath: string): string => readFileSync(absPath, "utf8");

const findPropertyLineIndex = (content: string, property: string): number => {
  const lines = content.split("\n");
  const re = new RegExp(`(^|[\\s,(])${property}[?!]?\\s*:\\s*`);
  return lines.findIndex((line) => re.test(line));
};

const assertEntityTypeContainsProperty = (
  filePath: string,
  property: GeneratedProperty
): void => {
  const content = readFile(filePath);
  expect(
    findPropertyLineIndex(content, property.property)
  ).toBeGreaterThanOrEqual(0);
};

const i18nInputsHasKey = (filePath: string, property: string): boolean => {
  const json = JSON.parse(readFile(filePath)) as {
    inputs?: Record<string, unknown>;
  };
  return json.inputs !== undefined && property in json.inputs;
};

const listPageHasColumn = (filePath: string, property: string): boolean => {
  const content = readFile(filePath);
  const head = new RegExp(`t\\(\\s*["\`']table\\.${property}["\`']\\s*\\)`);
  const body = new RegExp(`item\\?\\.${property}\\b`);
  return head.test(content) && body.test(content);
};

test.describe("Generators — file-level assertions", () => {
  for (const entity of matrix.entities) {
    test.describe(`entity ${entity.name}`, () => {
      const paths = entityPaths(entity.name, SRC);

      test("should scaffold all expected files", () => {
        expect(existsSync(paths.entityType), paths.entityType).toBe(true);
        expect(existsSync(paths.apiService), paths.apiService).toBe(true);
        expect(existsSync(paths.listPage), paths.listPage).toBe(true);
        expect(existsSync(paths.listPageContent), paths.listPageContent).toBe(
          true
        );
        expect(existsSync(paths.createPage), paths.createPage).toBe(true);
        expect(
          existsSync(paths.createPageContent),
          paths.createPageContent
        ).toBe(true);
        expect(existsSync(paths.editPage), paths.editPage).toBe(true);
        expect(existsSync(paths.editPageContent), paths.editPageContent).toBe(
          true
        );
        expect(existsSync(paths.queries), paths.queries).toBe(true);
        expect(existsSync(paths.i18nList), paths.i18nList).toBe(true);
        expect(existsSync(paths.i18nCreate), paths.i18nCreate).toBe(true);
        expect(existsSync(paths.i18nEdit), paths.i18nEdit).toBe(true);
      });

      for (const property of entity.properties) {
        test(`declares ${property.property} on the entity type`, () => {
          assertEntityTypeContainsProperty(paths.entityType, property);
        });

        test(`includes ${property.property} in create form i18n inputs`, () => {
          expect(i18nInputsHasKey(paths.i18nCreate, property.property)).toBe(
            true
          );
        });

        test(`includes ${property.property} in edit form i18n inputs`, () => {
          expect(i18nInputsHasKey(paths.i18nEdit, property.property)).toBe(
            true
          );
        });
      }

      const visibleColumns = entity.properties.filter((p) => p.isShowInTable);
      const hiddenColumns = entity.properties.filter((p) => !p.isShowInTable);

      for (const property of visibleColumns) {
        test(`renders ${property.property} as a table column (isShowInTable=true)`, () => {
          expect(
            listPageHasColumn(paths.listPageContent, property.property)
          ).toBe(true);
        });
      }

      for (const property of hiddenColumns) {
        test(`does NOT render ${property.property} as a table column (isShowInTable=false)`, () => {
          expect(
            listPageHasColumn(paths.listPageContent, property.property)
          ).toBe(false);
        });
      }
    });
  }

  test.describe("app-bar nav wiring", () => {
    const appBar = resolve(SRC, "components", "app-bar.tsx");

    for (const entity of matrix.entities) {
      const route = entityRouteSegment(entity.name);
      test(`adds /admin-panel/${route} nav link`, () => {
        const content = readFile(appBar);
        expect(content).toContain(`/admin-panel/${route}`);
      });
    }
  });

  test.describe("i18n JSON integrity", () => {
    for (const entity of matrix.entities) {
      const paths = entityPaths(entity.name, SRC);
      test(`${entity.name}: all three i18n JSONs parse`, () => {
        expect(() => JSON.parse(readFile(paths.i18nList))).not.toThrow();
        expect(() => JSON.parse(readFile(paths.i18nCreate))).not.toThrow();
        expect(() => JSON.parse(readFile(paths.i18nEdit))).not.toThrow();
      });
    }
  });
});

const entityCases = matrix.entities.flatMap((e: GeneratedEntity) =>
  e.properties.map((p) => ({ entity: e.name, property: p }))
);

test.describe("Generator matrix smoke", () => {
  test("matrix covers every kind", () => {
    const kinds = new Set(entityCases.map((c) => c.property.kind));
    expect(kinds.has("primitive")).toBe(true);
    expect(kinds.has("reference")).toBe(true);
    expect(kinds.has("denormalized")).toBe(true);
  });

  test("matrix covers every primitive type", () => {
    const types = new Set(
      entityCases
        .filter((c) => c.property.kind === "primitive")
        .map((c) => c.property.type)
    );
    expect(types.has("string")).toBe(true);
    expect(types.has("number")).toBe(true);
    expect(types.has("boolean")).toBe(true);
    expect(types.has("Date")).toBe(true);
  });

  test("matrix covers both reference cardinalities", () => {
    const cards = new Set(
      entityCases
        .filter((c) => c.property.kind === "reference")
        .map((c) => (c.property as { referenceType: string }).referenceType)
    );
    expect(cards.has("toOne")).toBe(true);
    expect(cards.has("toMany")).toBe(true);
  });
});
