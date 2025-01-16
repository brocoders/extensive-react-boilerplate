---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
at_line: 2
skip_if: import FormSelectExtendedInput from
---

<% if (kind === 'reference') { -%>
  <% if (type !== 'File') { -%>
    <% if (referenceType === 'toOne') { -%>
      import FormSelectExtendedInput from "@/components/form/select-extended/form-select-extended";
    <% } -%>
  <% } -%>
<% } -%>
