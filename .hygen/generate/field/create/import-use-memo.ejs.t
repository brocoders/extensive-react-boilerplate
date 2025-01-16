---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
before: from "react"
skip_if: useMemo,
---

<% if (kind === 'reference') { -%>
  <% if (type !== 'File') { -%>
    useMemo,
  <% } -%>
<% } -%>
