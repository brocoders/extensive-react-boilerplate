---
to: src/services/i18n/locales/en/admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-edit.json
---
{
  "title": "Edit",
  "actions": { "submit": "Save", "cancel": "Cancel" },
  "inputs": {
    "description": {
      "label": "Description",
      "validation": { "required": "Description is required" }
    }
  },
  "alerts": { "success": "<%= name %> has been updated successfully" }
}
