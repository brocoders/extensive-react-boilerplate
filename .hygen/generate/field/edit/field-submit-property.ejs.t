---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
before: \<edit\-form\-submit\-property \/\>
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <%= property %>: formData.<%= property %>,
  <% } else if (type === 'number') { -%>
    <%= property %>: formData.<%= property %> !== null ? Number(formData.<%= property %>) : null,
  <% } else if (type === 'boolean') { -%>
    <%= property %>: formData.<%= property %>,
  <% } else if (type === 'Date') { -%>
    <%= property %>: formData.<%= property %> ? formData.<%= property %>.toISOString() : null,
  <% } -%>
<% } else if (kind === 'reference') { -%>
  <% if (referenceType === 'toMany') { -%>
    <%= property %>: formData.<%= property %>,
  <% } else { -%>
    <%= property %>: formData.<%= property %>,
  <% } -%>
<% } -%>