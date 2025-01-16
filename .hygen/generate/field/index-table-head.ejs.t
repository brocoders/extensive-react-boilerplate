---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/page-content.tsx
before: \<index\-component\-head\-field \/\>
---
<% if (isShowInTable) { -%>
  <TableCell>{t("table.<%= property %>")}</TableCell>
<% } -%>