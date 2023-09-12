"use client";

import { createContext } from "react";
import { UrlObject } from "url";

type Url = string | UrlObject;

export type LeavePageContextParamsType = {
  push?: Url;
  replace?: Url;
} | null;

export type LeavePageInfoContextType = {
  leavePage: LeavePageContextParamsType;
};

export type LeavePageContextType = {
  isLeavePage: boolean;
};

export type LeavePageModalContextType = {
  isOpen: boolean;
};

export type LeavePageActionsContextType = {
  trackLeavePage: () => void;
  setLeavePage: (params: LeavePageContextParamsType) => void;
  untrackLeavePage: () => void;
  openModal: () => void;
  closeModal: () => void;
};

export const LeavePageContext = createContext<LeavePageContextType>({
  isLeavePage: false,
});

export const LeavePageModalContext = createContext<LeavePageModalContextType>({
  isOpen: false,
});

export const LeavePageInfoContext = createContext<LeavePageInfoContextType>({
  leavePage: null,
});

export const LeavePageActionsContext =
  createContext<LeavePageActionsContextType>({
    trackLeavePage: () => {},
    setLeavePage: () => {},
    untrackLeavePage: () => {},
    openModal: () => {},
    closeModal: () => {},
  });
