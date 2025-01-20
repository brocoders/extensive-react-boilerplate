---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/page-content.tsx
before: \<index\-component\-body\-field \/\>
---
<% if (isShowInTable) { -%>
  <% if (kind === 'primitive') { -%>
    <% if (type === 'string') { -%>
      <TableCell>{item?.<%= property %>}</TableCell>
    <% } else if (type === 'number') { -%>
      <TableCell>{item?.<%= property %>}</TableCell>
    <% } else if (type === 'boolean') { -%>
      <TableCell>{item?.<%= property %>?.toString()}</TableCell>
    <% } else if (type === 'Date') { -%>
      <TableCell>{item?.<%= property %>}</TableCell>
    <% } -%>
  <% } else if (kind === 'reference') { -%>
    <% if (referenceType === 'toMany') { -%>
      <% if (type === 'File') { -%>
        <TableCell>
          {item?.<%= property %>?.map?.((image) => {
            return (<img key={image.id} alt="<%= h.inflection.humanize(property) %>" src={image.path} width={80} />);
          })}
        </TableCell>
      <% } else { -%>
        <TableCell>
          {item?.<%= property %>?.map?.((itemEntity) => itemEntity.<%= propertyForSelect %>).join(", ")}
        </TableCell>
      <% } -%>
    <% } else { -%>
      <% if (type === 'File') { -%>
        <TableCell>
          <img alt="<%= h.inflection.humanize(property) %>" src={item?.<%= property %>?.path} width={80} />
        </TableCell>
      <% } else { -%>
        <TableCell>{item?.<%= property %>?.<%= propertyForSelect %>}</TableCell>
      <% } -%>
    <% } -%>
  <% } -%>
<% } -%>