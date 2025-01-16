---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
at_line: 2
skip_if: import FormMultipleSelectExtendedInput from
---

<% if (kind === 'reference') { -%>
  <% if (type !== 'File') { -%>
    <% if (referenceType === 'toMany') { -%>
      import FormMultipleSelectExtendedInput from "@/components/form/multiple-select-extended/form-multiple-select-extended";
    <% } -%>
  <% } -%>
<% } -%>
