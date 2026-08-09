"use client";
import { useRouter } from "next/navigation";
import useAuth from "./use-auth";
import React, { FunctionComponent, useEffect } from "react";
import useLanguage from "@/services/i18n/use-language";
import getSafeReturnTo from "./get-safe-return-to";

type PropsType = {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

function withPageRequiredGuest(Component: FunctionComponent<PropsType>) {
  return function PageRequiredGuest(props: PropsType) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();
    const language = useLanguage();

    useEffect(() => {
      const check = () => {
        if (!user || !isLoaded) return;

        const params = new URLSearchParams(window.location.search);
        // Accept only same-origin paths, or an attacker-supplied ?returnTo
        // redirects the user off-site after login.
        const returnTo = getSafeReturnTo(
          params.get("returnTo"),
          `/${language}`
        );
        router.replace(returnTo);
      };

      check();
    }, [user, isLoaded, router, language]);

    return !user && isLoaded ? <Component {...props} /> : null;
  };
}

export default withPageRequiredGuest;
