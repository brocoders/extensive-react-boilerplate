import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Opportunity } from "../types/opportunity";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";

export type OpportunitiesRequest = { page: number; limit: number };
export type OpportunitiesResponse = InfinityPaginationType<Opportunity>;

export function useGetOpportunitiesService() {
  const fetch = useFetch();

  return useCallback(
    (data: OpportunitiesRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/opportunities`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<OpportunitiesResponse>);
    },
    [fetch]
  );
}

export type OpportunityRequest = { id: Opportunity["id"] };
export type OpportunityResponse = Opportunity;

export function useGetOpportunityService() {
  const fetch = useFetch();

  return useCallback(
    (data: OpportunityRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/opportunities/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<OpportunityResponse>);
    },
    [fetch]
  );
}

export type OpportunityPostRequest = Omit<Opportunity, "id" | "createdAt">;
export type OpportunityPostResponse = Opportunity;

export function usePostOpportunityService() {
  const fetch = useFetch();

  return useCallback(
    (data: OpportunityPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/opportunities`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<OpportunityPostResponse>);
    },
    [fetch]
  );
}

export type OpportunityPutRequest = {
  id: Opportunity["id"];
  data: OpportunityPostRequest;
};
export type OpportunityPutResponse = Opportunity;

export function usePutOpportunityService() {
  const fetch = useFetch();

  return useCallback(
    (data: OpportunityPutRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/opportunities/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<OpportunityPutResponse>);
    },
    [fetch]
  );
}

export type OpportunityDeleteRequest = { id: Opportunity["id"] };
export type OpportunityDeleteResponse = undefined;

export function useDeleteOpportunityService() {
  const fetch = useFetch();

  return useCallback(
    (data: OpportunityDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/opportunities/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<OpportunityDeleteResponse>);
    },
    [fetch]
  );
}
