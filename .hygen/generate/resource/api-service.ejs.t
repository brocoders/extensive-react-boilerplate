---
to: src/services/api/services/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>.ts
---
import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import { <%= name %> as Entity } from "../types/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>";

export type Get<%= h.inflection.transform(name, ['pluralize']) %>Request = {
  page: number;
  limit: number;
};

export type Get<%= h.inflection.transform(name, ['pluralize']) %>Response = InfinityPaginationType<Entity>;

export function useGet<%= h.inflection.transform(name, ['pluralize']) %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Get<%= h.inflection.transform(name, ['pluralize']) %>Request, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Get<%= h.inflection.transform(name, ['pluralize']) %>Response>);
    },
    [fetch]
  );
}

export type Get<%= name %>Request = {
  id: Entity["id"];
};

export type Get<%= name %>Response = Entity;

export function useGet<%= name %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Get<%= name %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Get<%= name %>Response>);
    },
    [fetch]
  );
}

export type Create<%= name %>Request = Omit<Entity, "id" | "createdAt" | "updatedAt">;

export type Create<%= name %>Response = Entity;

export function useCreate<%= name %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Create<%= name %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Create<%= name %>Response>);
    },
    [fetch]
  );
}

export type Edit<%= name %>Request = {
  id: Entity["id"];
  data: Partial<Omit<Entity, "id" | "createdAt" | "updatedAt">>;
};

export type Edit<%= name %>Response = Entity;

export function useEdit<%= name %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Edit<%= name %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Edit<%= name %>Response>);
    },
    [fetch]
  );
}

export type Delete<%= name %>Request = {
  id: Entity["id"];
};

export type Delete<%= name %>Response = undefined;

export function useDelete<%= name %>Service() {
  const fetch = useFetch();

  return useCallback(
    (data: Delete<%= name %>Request, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<Delete<%= name %>Response>);
    },
    [fetch]
  );
}
