---
inject: true
to: src/services/api/types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.ts
after: export type <%= name %>
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: string;
  <% } else if (type === 'number') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: number | null;
  <% } else if (type === 'boolean') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: boolean;
  <% } else if (type === 'Date') { -%>
    <%= property %><% if (isOptional) { -%>?<% } -%>: string | null;
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
