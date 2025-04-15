import { useState } from "react";

// @next
import { usePathname } from "next/navigation";

// @mui
import { useTheme } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// @project
import NavItem from "./NavItem";
import DynamicIcon from "@/components/DynamicIcon";
import useMenuCollapse from "@/hooks/useMenuCollapse";

// @assets
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// @style
const verticalDivider = {
  "&:after": {
    content: "''",
    position: "absolute",
    left: 16,
    top: -2,
    height: `calc(100% + 2px)`,
    width: "1px",
    opacity: 1,
    bgcolor: "divider",
  },
};

/***************************  COLLAPSE - LOOP  ***************************/

function NavCollapseLoop({ item }: { item: NavItemType }) {
  return item.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} item={item} level={1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });
}

/***************************  RESPONSIVE DRAWER - COLLAPSE  ***************************/

interface NavItemType {
  id: string;
  title: string;
  icon?: string;
  type: "collapse" | "item";
  children?: NavItemType[];
}

export default function NavCollapse({
  item,
  level = 0,
}: {
  item: NavItemType;
  level?: number;
}) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Active item collapse on page load with sub-levels
  const pathname = usePathname();

  useMenuCollapse(item, pathname, false, setSelected, setOpen, undefined);

  const handleClick = () => {
    setOpen(!open);
  };

  const iconcolor = theme.palette.text.primary;

  return (
    <>
      <ListItemButton
        id={`${item.id}-btn`}
        selected={open || selected === item.id}
        sx={{
          my: 0.25,
          color: "text.primary",
          "&.Mui-selected": {
            color: "text.primary",
            "&.Mui-focusVisible": { bgcolor: "primary.light" },
          },
        }}
        onClick={handleClick}
      >
        {level === 0 && (
          <ListItemIcon>
            <DynamicIcon
              name={(item.icon || "Menu") as "Menu"}
              color={iconcolor}
              size={18}
              stroke={1.5}
            />
          </ListItemIcon>
        )}
        <ListItemText primary={item.title} sx={{ mb: "-1px" }} />
        {open ? (
          <ExpandLessIcon fontSize="small" />
        ) : (
          <ExpandMoreIcon fontSize="small" />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          sx={{ p: 0, pl: 3, position: "relative", ...verticalDivider }}
        >
          <NavCollapseLoop item={item} />
        </List>
      </Collapse>
    </>
  );
}

NavCollapseLoop.propTypes = { item: PropTypes.any };

NavCollapse.propTypes = { item: PropTypes.any, level: PropTypes.number };
