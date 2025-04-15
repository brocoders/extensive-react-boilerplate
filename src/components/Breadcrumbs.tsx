"use client";

import { useEffect, useState } from "react";

// @next
import { usePathname } from "next/navigation";

// @mui
import { useTheme } from "@mui/material/styles";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// @project
import { APP_DEFAULT_PATH } from "@/config";
import menuItems from "@/menu";
import { generateFocusStyle } from "@/utils/generateFocusStyle";
import Link from "@mui/material/Link";

// @data
const homeBreadcrumb = { title: "Home", url: APP_DEFAULT_PATH };

/***************************  BREADCRUMBS  ***************************/

interface BreadcrumbItem {
  title: string;
  url?: string;
  children?: BreadcrumbItem[];
}

interface BreadcrumbsProps {
  data?: BreadcrumbItem[];
}

export default function Breadcrumbs({ data }: BreadcrumbsProps) {
  const theme = useTheme();
  const location = usePathname();

  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const [activeItem, setActiveItem] = useState<BreadcrumbItem | undefined>();

  useEffect(() => {
    if (data?.length) {
      dataHandler(data);
    } else {
      for (const menu of menuItems?.items) {
        if (menu.type && menu.type === "group") {
          const matchedParents = findParentElements(
            menu.children || [],
            location
          );
          dataHandler(matchedParents || []);
          if (matchedParents) break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, location]);

  const dataHandler = (data: BreadcrumbItem[]) => {
    const active = data.at(-1);
    const linkItems = data.slice(0, -1);
    if (active && active.url !== homeBreadcrumb.url) {
      linkItems.unshift(homeBreadcrumb);
    }
    setActiveItem(active);
    setBreadcrumbItems(linkItems);
  };

  function findParentElements(
    navItems: Array<{
      id: string;
      title: string;
      type: string;
      url?: string;
      icon?: string;
      children?: Array<{
        id: string;
        title: string;
        type: string;
        url?: string;
        children?: Array<{
          id: string;
          title: string;
          type: string;
          url?: string;
        }>;
      }>;
    }>,
    targetUrl: string | any[],
    parents: BreadcrumbItem[] = []
  ): BreadcrumbItem[] | null {
    for (const item of navItems) {
      // Add the current item to the parents array
      const newParents = [...parents, item];

      // Check if the current item matches the target URL
      if (
        "url" in item &&
        typeof item.url === "string" &&
        targetUrl.includes(item.url)
      ) {
        return newParents; // Return the array of parent elements
      }

      // If the item has children, recurse into them
      if ("children" in item && item.children) {
        const result = findParentElements(item.children, targetUrl, newParents);
        if (result) {
          return result; // Return the result if found in children
        }
      }
    }

    return null; // Return null if no match is found
  }

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRightIcon fontSize="small" />}
    >
      {breadcrumbItems.length &&
        breadcrumbItems.map((item, index) => (
          <Typography
            {...(item.url && { component: Link, href: item.url })}
            variant="body2"
            sx={{
              p: 0.5,
              color: "grey.700",
              textDecoration: "none",
              ...(item.url && {
                cursor: "pointer",
                ":hover": { color: "primary.main" },
              }),
              ":focus-visible": {
                outline: "none",
                borderRadius: 0.25,
                ...generateFocusStyle(theme.palette.primary.main),
              },
            }}
            key={index}
          >
            {item.title}
          </Typography>
        ))}
      {activeItem && (
        <Typography variant="body2" sx={{ p: 0.5 }}>
          {activeItem.title}
        </Typography>
      )}
    </MuiBreadcrumbs>
  );
}
