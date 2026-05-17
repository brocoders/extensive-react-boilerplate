---
inject: true
to: src/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
at_line: 0
skip_if: <% if ((kind === 'reference' || kind === 'denormalized') && type === 'File') { -%>@/services/api/types/file-entity<% } else if (kind === 'reference' || kind === 'denormalized') { -%>@/services/api/types/<%= h.inflection.transform(type, ['underscore', 'dasherize']) %><% } -%>
---

<% if (kind === 'reference' || kind === 'denormalized') { -%>
  <% if (type === 'File') { -%>
    import { FileEntity } from "@/services/api/types/file-entity";
  <% } else { -%>
    import { <%= type %> } from "@/services/api/types/<%= h.inflection.transform(type, ['underscore', 'dasherize']) %>";
  <% } -%>
<% } -%>
