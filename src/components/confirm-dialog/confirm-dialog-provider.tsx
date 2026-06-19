"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ConfirmDialogActionsContext,
  ConfirmDialogOptions,
} from "./confirm-dialog-context";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "@/services/i18n/client";

function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("confirm-dialog");

  const defaultConfirmDialogInfo = useMemo<ConfirmDialogOptions>(
    () => ({
      title: t("title"),
      message: t("message"),
      successButtonText: t("actions.yes"),
      cancelButtonText: t("actions.no"),
    }),
    [t]
  );

  const [confirmDialogInfo, setConfirmDialogInfo] =
    useState<ConfirmDialogOptions>(defaultConfirmDialogInfo);
  const resolveRef = useRef<(value: boolean) => void>(undefined);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onCancel = () => {
    setIsOpen(false);
    resolveRef.current?.(false);
  };

  const onSuccess = () => {
    setIsOpen(false);
    resolveRef.current?.(true);
  };

  const confirmDialog = useCallback(
    (options: Partial<ConfirmDialogOptions> = {}) => {
      return new Promise<boolean>((resolve) => {
        setConfirmDialogInfo({
          ...defaultConfirmDialogInfo,
          ...options,
        });
        setIsOpen(true);
        resolveRef.current = resolve;
      });
    },
    [defaultConfirmDialogInfo]
  );

  const contextActions = useMemo(
    () => ({
      confirmDialog,
    }),
    [confirmDialog]
  );

  return (
    <>
      <ConfirmDialogActionsContext.Provider value={contextActions}>
        {children}
      </ConfirmDialogActionsContext.Provider>
      <AlertDialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialogInfo.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialogInfo.message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>
              {confirmDialogInfo.cancelButtonText}
            </AlertDialogCancel>
            <AlertDialogAction onClick={onSuccess}>
              {confirmDialogInfo.successButtonText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ConfirmDialogProvider;
