---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
at_line: 2
skip_if: import FormCheckboxBooleanInput from
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'boolean') { -%>
    import FormCheckboxBooleanInput from "@/components/form/checkbox-boolean/form-checkbox-boolean";
  <% } -%>
<% } -%>
