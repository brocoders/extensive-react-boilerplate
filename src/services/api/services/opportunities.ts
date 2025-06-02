import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Opportunity } from "../types/opportunity";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";
import HTTP_CODES_ENUM from "../types/http-codes";

// ----- Mock data -----
let mockOpportunities: Opportunity[] = [
  {
    id: 1,
    type: "factoring",
    clients: [
      {
        company: { id: 10, name: "Acme Corp" },
        contacts: [{ id: 100, name: "Alice" }],
      },
      {
        company: { id: 11, name: "Beta SA" },
        contacts: [{ id: 101, name: "Bob" }],
      },
    ],
    partners: [
      {
        type: "factor",
        company: { id: 20, name: "FactorCo" },
        contacts: [{ id: 200, name: "Charlie" }],
      },
    ],
    createdAt: "2025-05-15",
  },
  {
    id: 2,
    type: "reverse_factoring",
    clients: [
      {
        company: { id: 12, name: "Gamma Ltd" },
        contacts: [{ id: 102, name: "Diane" }],
      },
    ],
    partners: [
      {
        type: "credit_insurer",
        company: { id: 21, name: "InsureAll" },
        contacts: [{ id: 201, name: "Evan" }],
      },
    ],
    createdAt: "2025-06-01",
  },
  {
    id: 3,
    type: "credit_insurance",
    clients: [
      {
        company: { id: 13, name: "Delta LLC" },
        contacts: [{ id: 103, name: "Frank" }],
      },
    ],
    partners: [
      {
        type: "factor",
        company: { id: 22, name: "FinancePlus" },
        contacts: [{ id: 202, name: "Grace" }],
      },
    ],
    createdAt: "2025-04-20",
  },
];

export function mockGetOpportunities() {
  return Promise.resolve({
    status: HTTP_CODES_ENUM.OK,
    data: { data: mockOpportunities },
  });
}

export function mockDeleteOpportunity({ id }: { id: number }) {
  mockOpportunities = mockOpportunities.filter((o) => o.id !== id);
  return Promise.resolve({ status: HTTP_CODES_ENUM.OK });
}

export function mockPostOpportunity(data: OpportunityPostRequest) {
  const newId = Math.max(0, ...mockOpportunities.map((o) => o.id)) + 1;
  const created: Opportunity = {
    ...data,
    id: newId,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  mockOpportunities.push(created);
  return Promise.resolve({ status: HTTP_CODES_ENUM.CREATED, data: created });
}

export function mockPutOpportunity({ id, data }: OpportunityPutRequest) {
  const index = mockOpportunities.findIndex((o) => o.id === id);
  if (index !== -1) {
    mockOpportunities[index] = { ...mockOpportunities[index], ...data };
  }
  return Promise.resolve({ status: HTTP_CODES_ENUM.OK, data: mockOpportunities[index] });
}

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
