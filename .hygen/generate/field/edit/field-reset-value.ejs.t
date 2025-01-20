---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
before: \<edit\-form\-reset\-property \/\>
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <%= property %>: initialData.data.<%= property %> ?? "",
  <% } else if (type === 'number') { -%>
    <%= property %>: typeof initialData.data.<%= property %> === 'number' ? initialData.data.<%= property %>.toString() : "",
  <% } else if (type === 'boolean') { -%>
    <%= property %>: initialData.data.<%= property %> ?? false,
  <% } else if (type === 'Date') { -%>
    <%= property %>: initialData.data.<%= property %> ? new Date(initialData.data.<%= property %>) : null,
  <% } -%>
<% } else if (kind === 'reference') { -%>
  <% if (referenceType === 'toMany') { -%>
    <%= property %>: initialData.data.<%= property %> ?? [],
  <% } else { -%>
    <%= property %>: initialData.data.<%= property %> ?? null,
  <% } -%>
<% } -%>
