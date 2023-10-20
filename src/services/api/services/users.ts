import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { User } from "../types/user";
import { InfinityPaginationType } from "../types/infinity-pagination";
import { Role } from "../types/role";
import { SortEnum } from "../types/sort-type";

export type UsersRequest = {
  page: number;
  limit: number;
  filters?: {
    roles?: Role[];
  };
  sort?: Array<{
    orderBy: keyof User;
    order: SortEnum;
  }>;
};

export type UsersResponse = InfinityPaginationType<User>;

export function useGetUsersService() {
  const fetch = useFetch();

  return useCallback(
    (data: UsersRequest) => {
      const requestUrl = new URL(`${API_URL}/v1/users`);
      requestUrl.searchParams.append("page", data.page.toString());
      requestUrl.searchParams.append("limit", data.limit.toString());
      if (data.filters) {
        requestUrl.searchParams.append("filters", JSON.stringify(data.filters));
      }
      if (data.sort) {
        requestUrl.searchParams.append("sort", JSON.stringify(data.sort));
      }

      return fetch(requestUrl, {
        method: "GET",
      }).then(wrapperFetchJsonResponse<UsersResponse>);
    },
    [fetch]
  );
}

export type UserRequest = {
  id: User["id"];
};

export type UserResponse = User;

export function useGetUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserRequest) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "GET",
      }).then(wrapperFetchJsonResponse<UserResponse>);
    },
    [fetch]
  );
}

export type UserPostRequest = Pick<
  User,
  "email" | "firstName" | "lastName" | "photo" | "role"
> & {
  password: string;
};

export type UserPostResponse = User;

export function usePostUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserPostRequest) => {
      return fetch(`${API_URL}/v1/users`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<UserPostResponse>);
    },
    [fetch]
  );
}

export type UserPatchRequest = {
  id: User["id"];
  data: Partial<
    Pick<User, "email" | "firstName" | "lastName" | "photo" | "role"> & {
      password: string;
    }
  >;
};

export type UserPatchResponse = User;

export function usePatchUserService() {
  const fetch = useFetch();

  return useCallback(
    (data: UserPatchRequest) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify(data.data),
      }).then(wrapperFetchJsonResponse<UserPatchResponse>);
    },
    [fetch]
  );
}

export type UsersDeleteRequest = {
  id: User["id"];
};

export type UsersDeleteResponse = undefined;

export function useDeleteUsersService() {
  const fetch = useFetch();

  return useCallback(
    (data: UsersDeleteRequest) => {
      return fetch(`${API_URL}/v1/users/${data.id}`, {
        method: "DELETE",
      }).then(wrapperFetchJsonResponse<UsersDeleteResponse>);
    },
    [fetch]
  );
}
