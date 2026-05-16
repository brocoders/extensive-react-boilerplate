---
name: generate
description: Generate frontend admin-panel resources and fields via this project's hygen CLI (npm run generate:resource, npm run generate:field). Use when adding a new resource/entity or a new field/property to an admin panel in this Next.js boilerplate.
---

# Generate Frontend Resources

You are a software architect that designs entity schemas and scaffolds React admin panel code using CLI generators.

## Input

The user provides a natural language description of what they want to build (e.g., "blog with posts, categories, and comments").

## Workflow

### 1. Design the entity schema

Analyze the user's description and design entities with their properties. Follow these rules strictly:

#### Entities
- **Never generate "User" or "File" entities** — they already exist. You can reference them in relationships.
- Entity names must be PascalCase and singular (e.g., `Post`, `Category`, `BlogComment`).

#### Properties
- **Never add "id", "createdAt", or "updatedAt"** — these are predefined for all entities.
- Property names must be camelCase (e.g., `firstName`, `isActive`).

#### Relationships
- When the backend uses `oneToMany`, **do NOT** create the corresponding `manyToOne` on the frontend — the backend generator handles it automatically.
- For **File** relations, use only `oneToOne` (`toOne`) or `manyToMany` (`toMany`).

#### Property kinds (frontend only supports two)
- `primitive` — basic types: `string`, `number`, `boolean`, `Date`
- `reference` — relationship to another entity

#### Reference types (simplified)
- `toOne` — maps to backend's `oneToOne` or `manyToOne`
- `toMany` — maps to backend's `oneToMany` or `manyToMany`

### 2. Present the schema to the user

Before running commands, show the designed schema as a table or structured list so the user can review and approve it. Include entity names, property names, kinds, types, and relationship details.

### 3. Show all commands for verification

Once the schema is approved, list **all** commands that will be executed — first the resource generation commands, then the field commands. Present them clearly so the user can verify every command before execution.

**Always ask the user for explicit confirmation before running any commands.**

### 4. Run the commands

Only after the user confirms the commands, execute them in this exact order:

#### Step A: Generate resources (one per entity)

For each new entity (excluding User and File), run:

```bash
npm run generate:resource -- --name {EntityName}
```

Run these sequentially, one at a time.

#### Step B: Add fields (one per property)

Only generate fields for properties that users can set via the admin panel (i.e., properties with `isAddToDto: true` from the backend schema).

For each such property, run:

```bash
npm run generate:field -- --name {EntityName} --property {propertyName} --kind {kind} --type {type} --referenceType {referenceType} --propertyForSelect {propertyForSelect} --propertyInReference {propertyInReference} --isOptional {isOptional} --isShowInTable {isShowInTable}
```

**Argument rules:**
- `--name` (required): Entity name, PascalCase
- `--property` (required): Property name, camelCase
- `--kind` (required): `primitive` | `reference`
- `--type` (required): For primitive: `string` | `number` | `boolean` | `Date`. For reference: the referenced entity name (e.g., `User`, `File`, `Category`)
- `--referenceType`: Only for reference kind. Values: `toOne` | `toMany`
- `--propertyForSelect`: Only for reference kind when type is **not** `File`. The property name used for the dropdown display (e.g., `name`, `title`, `email`).
- `--propertyInReference`: Only when applicable (e.g., for inverse relationships)
- `--isOptional`: `true` | `false`
- `--isShowInTable`: `true` | `false` — whether to display this field in the list table

**Omit arguments that don't apply** (e.g., omit `--referenceType` for primitive properties, omit `--propertyForSelect` for File references or primitive properties).

Run these sequentially, one at a time.

## Example

User: "I need a blog with posts and categories. Posts belong to a category and can have a cover image."

**Commands:**
```bash
npm run generate:resource -- --name Category
npm run generate:resource -- --name Post

npm run generate:field -- --name Category --property name --kind primitive --type string --isOptional false --isShowInTable true

npm run generate:field -- --name Post --property title --kind primitive --type string --isOptional false --isShowInTable true
npm run generate:field -- --name Post --property body --kind primitive --type string --isOptional false --isShowInTable false
npm run generate:field -- --name Post --property category --kind reference --type Category --referenceType toOne --propertyForSelect name --isOptional false --isShowInTable true
npm run generate:field -- --name Post --property coverImage --kind reference --type File --referenceType toOne --isOptional true --isShowInTable false
```
