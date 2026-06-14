"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useAuth from "@/services/auth/use-auth";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import { RoleEnum } from "@/services/api/types/role";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Close the mobile drawer whenever the route changes. Isolated into its own
// component so the navigation list does not re-render when the sidebar toggles.
function CloseSidebarOnNavigate() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return null;
}

function AppSidebar() {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const pathname = usePathname();

  const isAdmin =
    !!user?.role && [RoleEnum.ADMIN].includes(Number(user?.role?.id));

  return (
    <>
      <CloseSidebarOnNavigate />
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.split("/").filter(Boolean).length <= 1}
                  >
                    <Link href="/">{t("common:navigation.home")}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {isAdmin && (
                  <>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.includes("/admin-panel/users")}
                      >
                        <Link href="/admin-panel/users">
                          {t("common:navigation.users")}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    {/* sidebar-menu-items */}
                  </>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

export default AppSidebar;
