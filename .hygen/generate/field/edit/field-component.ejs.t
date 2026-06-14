---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
before: \<edit\-component\-field \/\>
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <div className="col-span-12">
      <FormTextInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </div>
  <% } else if (type === 'number') { -%>
    <div className="col-span-12">
      <FormTextInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
        type="number"
      />
    </div>
  <% } else if (type === 'boolean') { -%>
    <div className="col-span-12">
      <FormCheckboxBooleanInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </div>
  <% } else if (type === 'Date') { -%>
    <div className="col-span-12">
      <FormDateTimePickerInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </div>
  <% } -%>
<% } else if (kind === 'reference' || kind === 'denormalized') { -%>
  <% if (referenceType === 'toMany') { -%>
    <% if (type === 'File') { -%>
      <div className="col-span-12">
        <FormMultipleImagePicker<EditFormData>
          name="<%= property %>"
          testId="<%= property %>"
          label={t("inputs.<%= property %>.label")}
        />
      </div>
    <% } else { -%>
      <div className="col-span-12">
        <<%= h.inflection.camelize(property, false) %>Field />
      </div>
    <% } -%>
  <% } else { -%>
    <% if (type === 'File') { -%>
      <div className="col-span-12">
        <FormImagePicker<EditFormData>
          name="<%= property %>"
          testId="<%= property %>"
          label={t("inputs.<%= property %>.label")}
        />
      </div>
    <% } else { -%>
      <div className="col-span-12">
        <<%= h.inflection.camelize(property, false) %>Field />
      </div>
    <% } -%>
  <% } -%>
<% } -%>