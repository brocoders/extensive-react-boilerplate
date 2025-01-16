---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
at_line: 2
skip_if: import { useGet<%= h.inflection.transform(type, ['pluralize']) %>Query }
---

<% if (kind === 'reference') { -%>
  <% if (type !== 'File') { -%>
    import { useGet<%= h.inflection.transform(type, ['pluralize']) %>Query } from "@/app/[language]/admin-panel/<%= h.inflection.transform(type, ['pluralize', 'underscore', 'dasherize']) %>/queries/queries";
  <% } -%>
<% } -%>
