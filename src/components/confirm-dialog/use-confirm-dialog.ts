"use client";

import { useContext } from "react";
import { ConfirmDialogActionsContext } from "./confirm-dialog-context";

const useConfirmDialog = () => {
  return useContext(ConfirmDialogActionsContext);
};

export default useConfirmDialog;
