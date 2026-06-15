"use client";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import ThemeSwitchButton from "@/components/switch-theme-button";
import LanguageSwitcher from "@/components/language-switcher";
import { IS_SIGN_UP_ENABLED } from "@/services/auth/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

function ResponsiveAppBar() {
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();

  return (
    <header className="sticky top-0 z-20 border-b bg-background text-foreground">
      <div className="flex h-[var(--header-height,4rem)] items-center gap-2 px-4">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger
          aria-label="open navigation menu"
          className="md:hidden"
        />

        {/* Brand */}
        <Link
          href="/"
          className="mr-auto font-mono text-lg font-bold tracking-[.3rem]"
        >
          {t("common:app-name")}
        </Link>

        <div className="mr-2 flex items-center gap-2">
          <ThemeSwitchButton />
          <LanguageSwitcher />
        </div>

        {!isLoaded ? (
          <Loader2 className="size-6 animate-spin" />
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="profile menu"
                data-testid="profile-menu-item"
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Avatar>
                  <AvatarImage
                    src={user.photo?.path}
                    alt={user?.firstName + " " + user?.lastName}
                  />
                  <AvatarFallback>
                    {(user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "")}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
        ) : (
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost">
              <Link href="/sign-in">{t("common:navigation.signIn")}</Link>
            </Button>
            {IS_SIGN_UP_ENABLED && (
              <Button asChild variant="ghost">
                <Link href="/sign-up">{t("common:navigation.signUp")}</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
export default ResponsiveAppBar;
