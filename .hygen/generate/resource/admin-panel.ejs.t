---
to: src/services/i18n/locales/en/admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.json
---
{
  "title": "<%= h.inflection.transform(name, ['pluralize']) %>",
  "table": {
    "column1": "ID"
  },
  "actions": {
    "add": "Add <%= name %>",
    "edit": "Edit",
    "delete": "Delete",
    "create": "Create <%= name %>"
  },
  "confirm": {
    "delete": {
      "title": "Delete <%= name %>",
      "message": "Are you sure you want to delete this <%= name %>?"
    }
  }
}
