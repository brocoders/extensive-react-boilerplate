"use client";
import { useRouter } from "next/navigation";
import useAuth from "./use-auth";
import React, { FunctionComponent, useEffect } from "react";

type PropsType = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

function withPageRequiredGuest(Component: FunctionComponent<PropsType>) {
  return function PageRequiredGuest(props: PropsType) {
    const { user, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const check = () => {
        if (!user || !isLoaded) return;

        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get("returnTo") ?? "/";
        router.replace(returnTo);
      };

      check();
    }, [user, isLoaded, router]);

    return !user && isLoaded ? <Component {...props} /> : null;
  };
}

export default withPageRequiredGuest;
