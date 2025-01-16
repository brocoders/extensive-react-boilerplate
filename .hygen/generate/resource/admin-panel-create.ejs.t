---
to: src/services/i18n/locales/en/admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-create.json
---
{
  "title": "Create <%= h.inflection.humanize(name, true) %>",
  "actions": { "submit": "Save", "cancel": "Cancel" },
  "inputs": {
    "<system>": "Do not remove this property"
  },
  "alerts": {
    "success": "<%= h.inflection.humanize(name) %> has been created successfully"
  }
}
