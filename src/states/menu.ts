import { useMemo } from "react";

// @third-party
import useSWR, { mutate } from "swr";

const initialState = {
  openedItem: "",
  isDashboardDrawerOpened: true,
};

export const endpoints = {
  key: "api/menu",
  master: "master",
};

export function useGetMenuMaster() {
  // to fetch initial state based on endpoints

  const { data, isLoading } = useSWR(
    endpoints.key + endpoints.master,
    () => initialState,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading,
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  // to update `isDashboardDrawerOpened` local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster = initialState) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}

export function handlerActiveItem(openedItem: any) {
  // to update `openedItem` local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster = initialState) => {
      return { ...currentMenuMaster, openedItem };
    },
    false
  );
}
