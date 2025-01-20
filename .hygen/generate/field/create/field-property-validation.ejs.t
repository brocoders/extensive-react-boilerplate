---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
before: \<create\-form\-validation\-schema \/\>
---

<% if (kind === 'primitive') { -%>
  <% if (type === 'string') { -%>
    <%= property %>: yup
      .string()
      <% if (!isOptional) { -%>
        .required(t("inputs.<%= property %>.validation.required"))
      <% } -%>
      ,
  <% } else if (type === 'number') { -%>
    <%= property %>: yup
      .string()
      <% if (!isOptional) { -%>
        .required(t("inputs.<%= property %>.validation.required"))
      <% } -%>
      ,
  <% } else if (type === 'boolean') { -%>
    <%= property %>: yup.boolean(),
  <% } else if (type === 'Date') { -%>
    <%= property %>: yup
      .date()
      <% if (!isOptional) { -%>
        .required(t("inputs.<%= property %>.validation.required"))
      <% } -%>
      .nullable(),
  <% } -%>
<% } else if (kind === 'reference') { -%>
  <% if (referenceType === 'toMany') { -%>
    <%= property %>: yup
      .array()
      .of(
        yup.mixed<
          <% if (type === 'File') { -%>
            FileEntity
          <% } else { -%>
            <%= type %>
          <% } -%>
        >().required()
      )
      <% if (!isOptional) { -%>
        .min(1, t("inputs.<%= property %>.validation.required"))
      <% } -%>
      .required(),
  <% } else { -%>
    <%= property %>: yup.mixed<
      <% if (type === 'File') { -%>
        FileEntity
      <% } else { -%>
        <%= type %>
      <% } -%>
    >()
      <% if (!isOptional) { -%>
        .required(t("inputs.<%= property %>.validation.required"))
      <% } -%>
      .nullable(),
  <% } -%>
<% } -%>
