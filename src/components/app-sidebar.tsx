"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import ChevronsUpDown from "lucide-react/dist/esm/icons/chevrons-up-down";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import { RoleEnum } from "@/services/api/types/role";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

function NavUser() {
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();

  if (!isLoaded) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <Loader2 className="size-4 animate-spin" />
            <span className="text-sidebar-foreground/70">
              {t("common:loading")}
            </span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/sign-in">{t("common:navigation.signIn")}</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {IS_SIGN_UP_ENABLED && (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/sign-up">{t("common:navigation.signUp")}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    );
  }

  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  const initials =
    `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              aria-label="profile menu"
              data-testid="profile-menu-item"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.photo?.path} alt={fullName} />
                <AvatarFallback className="rounded-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-start text-sm leading-tight">
                <span className="truncate font-medium">{fullName}</span>
                <span className="truncate text-xs text-sidebar-foreground/70">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ms-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
          >
            <DropdownMenuItem asChild data-testid="user-profile">
              <Link href="/profile">{t("common:navigation.profile")}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              data-testid="logout-menu-item"
              onClick={() => logOut()}
            >
              {t("common:navigation.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
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
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}

export default AppSidebar;
