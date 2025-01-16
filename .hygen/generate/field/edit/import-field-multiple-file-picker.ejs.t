---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
at_line: 2
skip_if: import FormMultipleImagePicker from
---

<% if (kind === 'reference') { -%>
  <% if (referenceType === 'toMany') { -%>
    <% if (type === 'File') { -%>
      import FormMultipleImagePicker from "@/components/form/multiple-image-picker/multiple-image-picker";
    <% } -%>
  <% } -%>
<% } -%>