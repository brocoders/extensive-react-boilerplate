import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Contact } from "../types/contact";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";

export type ContactsRequest = { page: number; limit: number };
export type ContactsResponse = InfinityPaginationType<Contact>;

export function useGetContactsService() {
  const fetch = useFetch();
  return useCallback(
    (data: ContactsRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/contacts`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<ContactsResponse>);
    },
    [fetch]
  );
}

export type ContactByIdRequest = { id: number | string };
export type ContactByIdResponse = Contact;

export function useGetContactByIdService() {
  const fetch = useFetch();
  return useCallback(
    (data: ContactByIdRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/contacts/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<ContactByIdResponse>);
    },
    [fetch]
  );
}

export type ContactPostRequest = Omit<Contact, "id">;
export type ContactPostResponse = Contact;

export function usePostContactService() {
  const fetch = useFetch();
  return useCallback(
    (data: ContactPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/contacts`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<ContactPostResponse>);
    },
    [fetch]
  );
}

export type ContactPutRequest = { id: number | string; data: ContactPostRequest };
export type ContactPutResponse = Contact;

export function usePutContactService() {
  const fetch = useFetch();
  return useCallback(
    (data: ContactPutRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/contacts/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<ContactPutResponse>);
    },
    [fetch]
  );
}

export type ContactDeleteRequest = { id: number | string };
export type ContactDeleteResponse = undefined;

export function useDeleteContactService() {
  const fetch = useFetch();
  return useCallback(
    (data: ContactDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/contacts/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<ContactDeleteResponse>);
    },
    [fetch]
  );
}
