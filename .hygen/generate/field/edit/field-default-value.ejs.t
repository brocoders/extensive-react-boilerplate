---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
after: const defaultValues
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <%= property %>: "",
  <% } else if (type === 'number') { -%>
    <%= property %>: "",
  <% } else if (type === 'boolean') { -%>
    <%= property %>: false,
  <% } else if (type === 'Date') { -%>
    <%= property %>: null,
  <% } -%>
<% } else if (kind === 'reference') { -%>
  <% if (referenceType === 'toMany') { -%>
    <%= property %>: [],
  <% } else { -%>
    <%= property %>: null,
  <% } -%>
<% } -%>
