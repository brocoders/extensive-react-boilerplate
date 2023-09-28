"use client";

import { useContext } from "react";
import { FacebookContext } from "./facebook-context";

export default function useFacebookAuth() {
  return useContext(FacebookContext);
}
