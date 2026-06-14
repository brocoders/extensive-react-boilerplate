---
to: src/services/api/services/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.ts
---
import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { <%= h.pascalName(name) %> as Entity } from "../types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>";

export type Get<%= h.pascalPluralName(name) %>ListRequest = {
  page: number;
  limit: number;
};

export type Get<%= h.pascalPluralName(name) %>ListResponse = InfinityPaginationType<Entity>;

export function useGet<%= h.pascalPluralName(name) %>ListService() {
  const fetch = useFetch();

  return useCallback(
    (data: Get<%= h.pascalPluralName(name) %>ListRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Get<%= h.pascalPluralName(name) %>ListResponse>);
    },
    [fetch]
  );
}

export type Get<%= h.pascalName(name) %>Request = {
  id: Entity["id"];
};

export type Get<%= h.pascalName(name) %>Response = Entity;

export function useGet<%= h.pascalName(name) %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Get<%= h.pascalName(name) %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Get<%= h.pascalName(name) %>Response>);
    },
    [fetch]
  );
}

export type Create<%= h.pascalName(name) %>Request = Omit<Entity, "id" | "createdAt" | "updatedAt">;

export type Create<%= h.pascalName(name) %>Response = Entity;

export function useCreate<%= h.pascalName(name) %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Create<%= h.pascalName(name) %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Create<%= h.pascalName(name) %>Response>);
    },
    [fetch]
  );
}

export type Edit<%= h.pascalName(name) %>Request = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type Edit<%= h.pascalName(name) %>Response = Entity;

export function useEdit<%= h.pascalName(name) %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Edit<%= h.pascalName(name) %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Edit<%= h.pascalName(name) %>Response>);
    },
    [fetch]
  );
}

export type Delete<%= h.pascalName(name) %>Request = {
  id: Entity["id"];
};

export type Delete<%= h.pascalName(name) %>Response = undefined;

export function useDelete<%= h.pascalName(name) %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Delete<%= h.pascalName(name) %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Delete<%= h.pascalName(name) %>Response>);
    },
    [fetch]
  );
}
