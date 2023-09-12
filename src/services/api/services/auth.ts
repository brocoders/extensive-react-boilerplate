import { useCallback } from "react";
import useFetchBase from "../use-fetch-base";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import { User } from "../types/user";
import { Tokens } from "../types/tokens";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = Tokens & {
  user: User;
};

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthLoginRequest) => {
      return fetchBase(`${API_URL}/v1/auth/email/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthLoginResponse>);
    },
    [fetchBase]
  );
}
export type AuthSignUpRequest = {
  email: string;
  password: string;
};

export type AuthSignUpResponse = void;

export function useAuthSignUpService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthSignUpRequest) => {
      return fetchBase(`${API_URL}/v1/auth/email/register`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthSignUpResponse>);
    },
    [fetchBase]
  );
}

export type AuthConfirmEmailRequest = {
  hash: string;
};

export type AuthConfirmEmailResponse = void;

export function useAuthConfirmEmailService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthConfirmEmailRequest) => {
      return fetchBase(`${API_URL}/v1/auth/email/confirm`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthConfirmEmailResponse>);
    },
    [fetchBase]
  );
}

export type AuthForgotPasswordRequest = {
  email: string;
};

export type AuthForgotPasswordResponse = void;

export function useAuthForgotPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthForgotPasswordRequest) => {
      return fetchBase(`${API_URL}/v1/auth/forgot/password`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthForgotPasswordResponse>);
    },
    [fetchBase]
  );
}

export type AuthResetPasswordRequest = {
  password: string;
  hash: string;
};

export type AuthResetPasswordResponse = void;

export function useAuthResetPasswordService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthResetPasswordRequest) => {
      return fetchBase(`${API_URL}/v1/auth/reset/password`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthResetPasswordResponse>);
    },
    [fetchBase]
  );
}

export type AuthPatchMeRequest =
  | Partial<Pick<User, "firstName" | "lastName">>
  | { password: string; oldPassword: string };

export type AuthPatchMeResponse = User;

export function useAuthPatchMeService() {
  const fetch = useFetch();

  return useCallback(
    (data: AuthPatchMeRequest) => {
      return fetch(`${API_URL}/v1/auth/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthPatchMeResponse>);
    },
    [fetch]
  );
}
