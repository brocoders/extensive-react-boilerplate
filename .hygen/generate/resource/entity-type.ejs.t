---
to: src/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
export type <%= name %> = {
  id: string;
  createdAt: string;
  updatedAt: string;
};
