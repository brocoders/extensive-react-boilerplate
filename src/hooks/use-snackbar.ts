import { useCallback } from "react";
import { toast } from "sonner";

export function useSnackbar() {
  const enqueueSnackbar = useCallback(
    (
      message: string,
      config?: { variant?: "success" | "error"; autoHideDuration?: number }
    ) => {
      const options =
        config?.autoHideDuration !== undefined
          ? { duration: config.autoHideDuration }
          : undefined;

      if (config?.variant === "success") {
        toast.success(message, options);
      } else if (config?.variant === "error") {
        toast.error(message, options);
      } else {
        toast(message, options);
      }
    },
    []
  );

  return { enqueueSnackbar };
}
