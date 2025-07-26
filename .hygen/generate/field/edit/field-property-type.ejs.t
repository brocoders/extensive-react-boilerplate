---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
after: type EditFormData
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <%= property %>: string;
  <% } else if (type === 'number') { -%>
    <%= property %>: string;
  <% } else if (type === 'boolean') { -%>
    <%= property %>: boolean;
  <% } else if (type === 'Date') { -%>
    <%= property %>: Date | null;
  <% } -%>
<% } else if (kind === 'reference') { -%>
  <% if (referenceType === 'toMany') { -%>
    <% if (type === 'File') { -%>
      <%= property %>: FileEntity[];
    <% } else { -%>
      <%= property %>: <%= type %>[];
    <% } -%>
  <% } else { -%>
    <% if (type === 'File') { -%>
      <%= property %>: FileEntity | null;
    <% } else { -%>
      <%= property %>: <%= type %> | null;
    <% } -%>
  <% } -%>
<% } -%>
