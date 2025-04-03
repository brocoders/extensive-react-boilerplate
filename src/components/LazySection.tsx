// "use client";

// import { useState, useRef, useEffect, createElement, useMemo } from "react";

// // @mui
// import Box from "@mui/material/Box";

// // @project
// import Loader from "@/components/Loader";

// interface Section {
//   importFunc: () => Promise<{ default: React.ComponentType<any> }>;
//   props?: any;
// }

// interface LazySectionProps {
//   sections: Section | Section[];
//   fallback?: React.ReactNode;
//   offset?: string;
//   placeholderHeight?: number;
// }

// export default function LazySection({
//   sections,
//   fallback = <Loader />,
//   offset = "0px",
//   placeholderHeight = 400,
// }: LazySectionProps) {
//   const sectionList = useMemo(
//     () => (Array.isArray(sections) ? sections : [sections]),
//     [sections]
//   );
//   const [isVisible, setIsVisible] = useState(false);
//   const [loadedComponents, setLoadedComponents] = useState(
//     Array(sectionList.length).fill(null)
//   );
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !isVisible) {
//           setIsVisible(true);
//           Promise.all(
//             sectionList.map((section) =>
//               section.importFunc().then((module) => module.default)
//             )
//           ).then((components) => setLoadedComponents(components));
//         }
//       },
//       { rootMargin: offset, threshold: 0.1 }
//     );

//     if (ref.current) observer.observe(ref.current);

//     return () => observer.disconnect();
//   }, [sectionList, offset, isVisible]);

//   return (
//     <Box ref={ref} sx={{ minHeight: placeholderHeight }}>
//       {isVisible && loadedComponents.every((component) => component)
//         ? sectionList.map((section, index) =>
//             createElement(loadedComponents[index], {
//               key: index,
//               ...section.props,
//             })
//           )
//         : isVisible && fallback}
//     </Box>
//   );
// }
"use client";

import {
  useState,
  useRef,
  useEffect,
  createElement,
  useMemo,
  lazy,
  Suspense,
} from "react";
import Box from "@mui/material/Box";
import Loader from "@/components/Loader";

// 🔹 Define a map of components (manually list all lazy-loaded components)
const componentMap: Record<
  string,
  React.LazyExoticComponent<React.ComponentType<any>>
> = {
  Features: lazy(() => import("@/sections/Features")),
};

interface Section {
  componentKey: keyof typeof componentMap; // Use predefined component keys
  props?: Record<string, any>;
}

interface LazySectionProps {
  sections: Section[];
  fallback?: React.ReactNode;
  offset?: string;
  placeholderHeight?: number;
}

export default function LazySection({
  sections,
  fallback = <Loader />,
  offset = "0px",
  placeholderHeight = 400,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: offset, threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [offset]);

  return (
    <Box ref={ref} sx={{ minHeight: placeholderHeight }}>
      {isVisible
        ? sections.map(({ componentKey, props }, index) => {
            const LazyComponent = componentMap[componentKey]; // 🔹 Get component from map

            if (!LazyComponent) {
              console.error(
                `Component "${componentKey}" not found in componentMap.`
              );
              return null;
            }

            return (
              <Suspense key={index} fallback={fallback}>
                <LazyComponent {...props} />
              </Suspense>
            );
          })
        : null}
    </Box>
  );
}
