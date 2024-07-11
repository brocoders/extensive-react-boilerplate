---
to: src/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
---
export type <%= name %> = {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
