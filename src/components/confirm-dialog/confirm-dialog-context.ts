"use client";

import { createContext } from "react";

export type ConfirmDialogOptions = {
  title: string;
  message: string;
  successButtonText: string;
  cancelButtonText: string;
};

export const ConfirmDialogActionsContext = createContext<{
  confirmDialog: ({
    title,
    message,
    successButtonText,
    cancelButtonText,
  }?: Partial<ConfirmDialogOptions>) => Promise<boolean>;
}>({
  confirmDialog: () => Promise.resolve(false),
});
