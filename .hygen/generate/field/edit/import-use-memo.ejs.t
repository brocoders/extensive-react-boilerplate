---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
before: from "react"
skip_if: useMemo,
---

<% if (kind === 'reference' || kind === 'denormalized') { -%>
  <% if (type !== 'File') { -%>
    useMemo,
  <% } -%>
<% } -%>
