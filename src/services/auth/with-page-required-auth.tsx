"use client";
import { useRouter } from "next/navigation";
import useAuth from "./use-auth";
import React, { FunctionComponent, useEffect } from "react";
import useLanguage from "../i18n/use-language";

type PropsType = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function withPageRequiredAuth(Component: FunctionComponent<PropsType>) {
  return function WithPageRequiredAuth(props: PropsType) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();
    const language = useLanguage();

    useEffect(() => {
      const check = () => {
        if (user || !isLoaded) return;

        const currentLocation = window.location.toString();
        const returnToPath =
          currentLocation.replace(new URL(currentLocation).origin, "") || "/";
        const params = new URLSearchParams({
          returnTo: returnToPath,
        });
        router.replace(`/${language}/sign-in?${params.toString()}`);
      };

      check();
    }, [user, isLoaded, router, language]);

    return user ? <Component {...props} /> : null;
  };
}

export default withPageRequiredAuth;
