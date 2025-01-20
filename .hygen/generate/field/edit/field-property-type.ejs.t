---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
after: type EditFormData
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: string;
  <% } else if (type === 'number') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: string;
  <% } else if (type === 'boolean') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: boolean;
  <% } else if (type === 'Date') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: Date | null;
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
      <%= property %><% if (isOptional) { -%>?<% } -%>: FileEntity | null;
    <% } else { -%>
      <%= property %><% if (isOptional) { -%>?<% } -%>: <%= type %> | null;
    <% } -%>
  <% } -%>
<% } -%>
