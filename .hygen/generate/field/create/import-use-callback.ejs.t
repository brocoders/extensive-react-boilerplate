---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
at_line: 2
skip_if: useCallback,
---

<% if (kind === 'reference') { -%>
  <% if (type !== 'File') { -%>
    import {
      // React dependencies here
      useCallback,
    } from "react";
  <% } -%>
<% } -%>
