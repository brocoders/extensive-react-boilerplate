import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { Company } from "../types/company";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { RequestConfigType } from "./types/request-config";

export type CompaniesRequest = {
  page: number;
  limit: number;
};

export type CompaniesResponse = InfinityPaginationType<Company>;

export function useGetCompaniesService() {
  const fetch = useFetch();

  return useCallback(
    (data: CompaniesRequest, requestConfig?: RequestConfigType) => {
      const requestUrl = new URL(`${API_URL}/v1/companies`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());

      return fetch(requestUrl, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CompaniesResponse>);
    },
    [fetch]
  );
}

export type CompanyRequest = {
  id: Company["id"];
};

export type CompanyResponse = Company;

export function useGetCompanyService() {
  const fetch = useFetch();

  return useCallback(
    (data: CompanyRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/companies/${data.id}`, {
        method: "GET",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CompanyResponse>);
    },
    [fetch]
  );
}

export type CompanyPostRequest = Omit<Company, "id">;

export type CompanyPostResponse = Company;

export function usePostCompanyService() {
  const fetch = useFetch();

  return useCallback(
    (data: CompanyPostRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/companies`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CompanyPostResponse>);
    },
    [fetch]
  );
}

export type CompanyPatchRequest = {
  id: Company["id"];
  data: Partial<Omit<Company, "id">>;
};

export type CompanyPatchResponse = Company;

export function usePatchCompanyService() {
  const fetch = useFetch();

  return useCallback(
    (data: CompanyPatchRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/companies/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CompanyPatchResponse>);
    },
    [fetch]
  );
}

export type CompaniesDeleteRequest = {
  id: Company["id"];
};

export type CompaniesDeleteResponse = undefined;

export function useDeleteCompaniesService() {
  const fetch = useFetch();

  return useCallback(
    (data: CompaniesDeleteRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/v1/companies/${data.id}`, {
        method: "DELETE",
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<CompaniesDeleteResponse>);
    },
    [fetch]
  );
}
