import { SetStateAction, useEffect } from "react";

/***************************  MENU COLLAPSED - RECURSIVE FUNCTION  ***************************/

/**
 * Recursively traverses menu items to find and open the correct parent menu.
 * If a menu item matches the current pathname, it marks the corresponding menu as selected and opens it.
 *
 * @param {NavItemType[]} items - List of menu items.
 * @param {string} pathname - Current route pathname.
 * @param {string | undefined} menuId - ID of the menu to be set as selected.
 * @param {SetState<string | null>} setSelected - Function to update the selected menu.
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - Function to update the open state.
 */

function setParentOpenedMenu(
  items: any,
  pathname: any,
  menuId: any,
  setSelected: (arg0: any) => void,
  setOpen: (arg0: boolean) => void
) {
  for (const item of items) {
    // Recursively check child menus
    if (item.children?.length) {
      setParentOpenedMenu(
        item.children,
        pathname,
        menuId,
        setSelected,
        setOpen
      );
    }

    if (item.url === pathname) {
      setSelected(menuId ?? null);
      setOpen(true);
    }
  }
}

/***************************  MENU COLLAPSED - HOOK  ***************************/

/**
 * Hook to handle menu collapse behavior based on the current route.
 * Automatically expands the parent menu of the active route item.
 *
 * @param {NavItemType} menu - The menu object containing items.
 * @param {string} pathname - Current route pathname.
 * @param {boolean} miniMenuOpened - Flag indicating if the mini menu is open.
 * @param {SetState<string | null>} setSelected - Function to update selected menu state.
 * @param {Dispatch<SetStateAction<boolean>>} setOpen - Function to update menu open state.
 * @param {SetState<HTMLElement>} setAnchorEl - Function to update the anchor element state.
 */

export default function useMenuCollapse(
  menu: any,
  pathname: unknown,
  miniMenuOpened: boolean,
  setSelected: { (value: SetStateAction<null>): void; (arg0: null): void },
  setOpen: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  setAnchorEl: ((arg0: null) => void) | undefined
) {
  useEffect(() => {
    setOpen(false); // Close the menu initially

    // Reset selection based on menu state
    if (!miniMenuOpened) {
      setSelected(null);
    } else {
      if (setAnchorEl) setAnchorEl(null);
    }

    // If menu has children, determine which should be opened
    if (menu.children?.length) {
      setParentOpenedMenu(
        menu.children,
        pathname,
        menu.id,
        setSelected,
        setOpen
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);
}
