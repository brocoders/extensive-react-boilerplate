---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
at_line: 2
skip_if: <% if ((kind === 'reference' || kind === 'denormalized') && type === 'File') { -%>@/services/api/types/file-entity<% } else if (kind === 'reference' || kind === 'denormalized') { -%>@/services/api/types/<%= h.inflection.transform(type, ['underscore', 'dasherize']) %><% } -%>
---

<% if (kind === 'reference' || kind === 'denormalized') { -%>
  <% if (type === 'File') { -%>
    import { FileEntity } from "@/services/api/types/file-entity";
  <% } else { -%>
    import { <%= type %> } from "@/services/api/types/<%= h.inflection.transform(type, ['underscore', 'dasherize']) %>";
  <% } -%>
<% } -%>
