"use client";

// @third-party
import { motion } from "framer-motion";

/***************************  COMMON - BUTTON ANIMATION  ***************************/

import { ReactNode, CSSProperties } from "react";

interface ButtonAnimationWrapperProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function ButtonAnimationWrapper({
  children,
  style,
}: ButtonAnimationWrapperProps) {
  return (
    <motion.div
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      tabIndex={-1}
      style={style}
    >
      {children}
    </motion.div>
  );
}
