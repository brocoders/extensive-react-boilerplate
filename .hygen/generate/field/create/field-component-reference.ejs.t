---
inject: true
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/create/page-content.tsx
before: \<create\-component\-reference\-field \/\>
---

<% if (kind === 'reference') { -%>
  <% if (type !== 'File') { -%>
    function <%= h.inflection.camelize(property, false) %>Field() {
      const { t } = useTranslation("admin-panel-<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>-create");
      const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
        useGet<%= h.inflection.transform(type, ['pluralize']) %>Query();

      const options = useMemo(
        () => (data?.pages.flatMap((page) => page?.data ?? []).filter(Boolean) ?? []),
        [data]
      );

      const handleScroll = useCallback(() => {
        if (!hasNextPage || isFetchingNextPage) return;
        fetchNextPage();
      }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

      return (
        <% if (referenceType === 'toMany') { -%>
          <FormMultipleSelectExtendedInput<CreateFormData, <%= type %>>
            name="<%= property %>"
            label={t("inputs.<%= property %>.label")}
            testId="<%= property %>"
            options={options}
            onEndReached={handleScroll}
            renderOption={(option) => option.<%= propertyForSelect %>}
            keyExtractor={(option) => option.id.toString()}
            renderSelected={(selectedOptions) =>
              selectedOptions.map((selectedOption) => selectedOption.<%= propertyForSelect %>).join(", ")
            }
          />
        <% } else { -%>
          <FormSelectExtendedInput<CreateFormData, <%= type %>>
            name="<%= property %>"
            label={t("inputs.<%= property %>.label")}
            testId="<%= property %>"
            options={options}
            onEndReached={handleScroll}
            renderOption={(option) => option.<%= propertyForSelect %>}
            keyExtractor={(option) => option.id.toString()}
            renderSelected={(selectedOption) => selectedOption.<%= propertyForSelect %>}
          />
        <% } -%>
      );
    }
  <% } -%>
<% } -%>
