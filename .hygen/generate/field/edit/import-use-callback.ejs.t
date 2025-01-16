---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
before: from "react"
skip_if: useCallback,
---

<% if (kind === 'reference') { -%>
  <% if (type !== 'File') { -%>
    useCallback,
  <% } -%>
<% } -%>
