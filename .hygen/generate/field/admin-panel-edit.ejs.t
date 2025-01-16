---
to: src/services/i18n/locales/en/admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-edit.json
inject: true
before: <system>
---
    "<%= property %>": {
      "label": "<%= h.inflection.humanize(property) %>",
      "validation": {
        "required": "<%= h.inflection.humanize(property) %> is required"
      }
    },