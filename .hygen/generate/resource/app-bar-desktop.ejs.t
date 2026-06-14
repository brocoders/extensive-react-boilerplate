---
inject: true
to: src/components/app-bar.tsx
before: desktop-menu-items
---
<Button asChild variant="ghost" className={navButtonClass}>
  <Link href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>">
    {t("common:navigation.<%= h.inflection.humanize(h.inflection.camelize(h.inflection.pluralize(name), true)) %>")}
  </Link>
</Button>