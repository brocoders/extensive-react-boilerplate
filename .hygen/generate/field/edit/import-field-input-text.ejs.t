---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
at_line: 2
skip_if: import FormTextInput from
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string' || type === 'number') { -%>
    import FormTextInput from "@/components/form/text-input/form-text-input";
  <% } -%>
<% } -%>
