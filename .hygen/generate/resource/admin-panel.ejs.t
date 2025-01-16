---
to: src/services/i18n/locales/en/admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.json
---
{
  "title": "<%= h.inflection.humanize(h.inflection.transform(name, ['pluralize'])) %>",
  "table": {
    "column1": "ID",
    "<system>": "Do not remove this property"
  },
  "actions": {
    "add": "Add <%= h.inflection.humanize(name, true) %>",
    "edit": "Edit",
    "delete": "Delete",
    "create": "Create <%= h.inflection.humanize(name, true) %>"
  },
  "confirm": {
    "delete": {
      "title": "Delete <%= h.inflection.humanize(name, true) %>",
      "message": "Are you sure you want to delete this <%= h.inflection.humanize(name, true) %>?"
    }
  }
}
