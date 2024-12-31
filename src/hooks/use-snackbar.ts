import { useCallback } from "react";
import { toast } from "react-toastify";

export function useSnackbar() {
  const enqueueSnackbar = useCallback(
    (
      message: string,
      config?: { variant?: "success" | "error"; autoHideDuration?: number }
    ) => {
      toast(
        message,
        config
          ? {
              type: config.variant,
              autoClose: config.autoHideDuration,
            }
          : undefined
      );
    },
    []
  );

  return { enqueueSnackbar };
}
