---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
before: \<create\-component\-field \/\>
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <Grid size={{ xs: 12 }}>
      <FormTextInput<CreateFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </Grid>
  <% } else if (type === 'number') { -%>
    <Grid size={{ xs: 12 }}>
      <FormTextInput<CreateFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
        type="number"
      />
    </Grid>
  <% } else if (type === 'boolean') { -%>
    <Grid size={{ xs: 12 }}>
      <FormCheckboxBooleanInput<CreateFormData>
        name="<%= property %>"
        testId="<%= property %>"
        label={t("inputs.<%= property %>.label")}
      />
    </Grid>
  <% } else if (type === 'Date') { -%>
    <Grid size={{ xs: 12 }}>
      <FormDateTimePickerInput<CreateFormData>
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
        <FormMultipleImagePicker<CreateFormData>
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
        <FormImagePicker<CreateFormData>
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