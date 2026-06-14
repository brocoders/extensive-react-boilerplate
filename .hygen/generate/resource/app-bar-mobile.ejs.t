---
inject: true
to: src/components/app-bar.tsx
before: mobile-menu-items
---
<Button
  asChild
  variant="ghost"
  className="justify-start"
  onClick={closeMobile}
>
  <Link href="/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>">
    {t("common:navigation.<%= h.inflection.humanize(h.inflection.camelize(h.inflection.pluralize(name), true)) %>")}
  </Link>
</Button>