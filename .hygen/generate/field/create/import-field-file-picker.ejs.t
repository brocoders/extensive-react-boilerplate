---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
at_line: 2
skip_if: import FormImagePicker from
---

<% if (kind === 'reference') { -%>
  <% if (referenceType === 'toOne') { -%>
    <% if (type === 'File') { -%>
      import FormImagePicker from "@/components/form/image-picker/image-picker";
    <% } -%>
  <% } -%>  
<% } -%>