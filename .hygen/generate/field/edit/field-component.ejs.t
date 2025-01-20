---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/edit/[id]/page-content.tsx
before: \<edit\-component\-field \/\>
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <Grid size={{ xs: 12 }}>
      <FormTextInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </Grid>
  <% } else if (type === 'number') { -%>
    <Grid size={{ xs: 12 }}>
      <FormTextInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
        type="number"
      />
    </Grid>
  <% } else if (type === 'boolean') { -%>
    <Grid size={{ xs: 12 }}>
      <FormCheckboxBooleanInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </Grid>
  <% } else if (type === 'Date') { -%>
    <Grid size={{ xs: 12 }}>
      <FormDateTimePickerInput<EditFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </Grid>
  <% } -%>
<% } else if (kind === 'reference') { -%>
  <% if (referenceType === 'toMany') { -%>
    <% if (type === 'File') { -%>
      <Grid size={{ xs: 12 }}>
        <FormMultipleImagePicker<EditFormData>
          name="<%= property %>"
          testId="<%= property %>"
          label={t("inputs.<%= property %>.label")}
        />
      </Grid>
    <% } else { -%>
      <Grid size={{ xs: 12 }}>
        <<%= h.inflection.camelize(property, false) %>Field />
      </Grid>
    <% } -%>
  <% } else { -%>
    <% if (type === 'File') { -%>
      <Grid size={{ xs: 12 }}>
        <FormImagePicker<EditFormData>
          name="<%= property %>"
          testId="<%= property %>"
          label={t("inputs.<%= property %>.label")}
        />
      </Grid>
    <% } else { -%>
      <Grid size={{ xs: 12 }}>
        <<%= h.inflection.camelize(property, false) %>Field />
      </Grid>
    <% } -%>
  <% } -%>
<% } -%>