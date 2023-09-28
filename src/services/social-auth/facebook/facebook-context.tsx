"use client";

import { createContext } from "react";

export type FacebookAuthResponse = {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
};

export type FacebookAuthLoginResponse = {
  authResponse: FacebookAuthResponse;
};

export const FacebookContext = createContext<{
  login: () => Promise<FacebookAuthLoginResponse>;
}>({
  login: async () => {
    throw new Error("FacebookAuthProvider not mounted");
  },
});
