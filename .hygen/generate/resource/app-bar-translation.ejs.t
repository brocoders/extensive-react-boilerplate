---
inject: true
to: src/services/i18n/locales/en/common.json
after: "navigation"
---
    "<%= h.inflection.humanize(h.inflection.camelize(h.inflection.pluralize(name), true)) %>": "<%= h.inflection.transform(name, ['pluralize', 'underscore', 'humanize']) %>",