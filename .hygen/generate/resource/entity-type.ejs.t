---
to: src/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
export type <%= h.pascalName(name) %> = {
  id: string;
  createdAt: string;
  updatedAt: string;
};
