---
inject: true
to: src/components/app-bar.tsx
before: mobile-menu-items
---
<MenuItem
  key="<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>"
  onClick={handleCloseNavMenu}
  component={Link}
  href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>"
>
  <Typography textAlign="center">
    {t("common:navigation.<%= h.inflection.humanize(h.inflection.camelize(h.inflection.pluralize(name), true)) %>")}
  </Typography>
</MenuItem>,