---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/page-content.tsx
before: \<index\-component\-head\-field \/\>
---
<% if (isShowInTable) { -%>
  <TableHead>{t("table.<%= property %>")}</TableHead>
<% } -%>