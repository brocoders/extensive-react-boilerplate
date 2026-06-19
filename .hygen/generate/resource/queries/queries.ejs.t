---
to: src/app/[language]/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/queries/queries.ts
---
"use client";

import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { createQueryKeys } from "@/services/react-query/query-key-factory";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  Get<%= h.pascalName(name) %>Request,
  useGet<%= h.pascalName(name) %>Service,
  useGet<%= h.pascalPluralName(name) %>ListService,
} from "@/services/api/services/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>";

export const <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys = createQueryKeys(["<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>"], {
  list: () => ({
    key: [],
  }),
  byId: (id: string) => ({
    key: [id],
  }),
});

export const useGet<%= h.pascalPluralName(name) %>ListQuery = () => {
  const fetch = useGet<%= h.pascalPluralName(name) %>ListService();

  const query = useInfiniteQuery({
    queryKey: <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys.list().key,
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const { status, data } = await fetch(
        {
          page: pageParam,
          limit: 10,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data: data.data,
          nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        };
      }
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
  });

  return query;
};

export const useGet<%= h.pascalName(name) %>Query = ({ id }: Get<%= h.pascalName(name) %>Request) => {
  const fetch = useGet<%= h.pascalName(name) %>Service();

  return useQuery({
    queryKey: <%= h.inflection.camelize(h.inflection.pluralize(name), true) %>QueryKeys.byId(id).key,
    queryFn: async ({ signal }) => {
      const { status, data } = await fetch(
        {
          id,
        },
        {
          signal,
        }
      );

      if (status === HTTP_CODES_ENUM.OK) {
        return {
          data,
        };
      }
    },
  });
};
