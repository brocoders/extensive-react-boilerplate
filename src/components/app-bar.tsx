"use client";
import { useState } from "react";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import Menu from "lucide-react/dist/esm/icons/menu";
import useAuth from "@/services/auth/use-auth";
import useAuthActions from "@/services/auth/use-auth-actions";
import { useTranslation } from "@/services/i18n/client";
import Link from "@/components/link";
import { RoleEnum } from "@/services/api/types/role";
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
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navButtonClass =
  "hover:bg-primary-foreground/10 hover:text-primary-foreground";

function ResponsiveAppBar() {
  const { t } = useTranslation("common");
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin =
    !!user?.role && [RoleEnum.ADMIN].includes(Number(user?.role?.id));

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-2 px-4">
        {/* Mobile navigation */}
        <div className="flex md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="open navigation menu"
                className={navButtonClass}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="text-foreground">
              <SheetTitle className="px-4 pt-4 font-mono tracking-[.3rem]">
                {t("common:app-name")}
              </SheetTitle>
              <nav className="flex flex-col px-2">
                <Button
                  asChild
                  variant="ghost"
                  className="justify-start"
                  onClick={closeMobile}
                >
                  <Link href="/">{t("common:navigation.home")}</Link>
                </Button>

                {isAdmin && (
                  <>
                    <Button
                      asChild
                      variant="ghost"
                      className="justify-start"
                      onClick={closeMobile}
                    >
                      <Link href="/admin-panel/users">
                        {t("common:navigation.users")}
                      </Link>
                    </Button>
                    {/* mobile-menu-items */}
                  </>
                )}

                {isLoaded && !user && (
                  <>
                    <div className="my-1 border-t" />
                    <Button
                      asChild
                      variant="ghost"
                      className="justify-start"
                      onClick={closeMobile}
                    >
                      <Link href="/sign-in">
                        {t("common:navigation.signIn")}
                      </Link>
                    </Button>
                    {IS_SIGN_UP_ENABLED && (
                      <Button
                        asChild
                        variant="ghost"
                        className="justify-start"
                        onClick={closeMobile}
                      >
                        <Link href="/sign-up">
                          {t("common:navigation.signUp")}
                        </Link>
                      </Button>
                    )}
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand (desktop) */}
        <Link
          href="/"
          className="mr-4 hidden font-mono text-lg font-bold tracking-[.3rem] md:flex"
        >
          {t("common:app-name")}
        </Link>
        {/* Brand (mobile) */}
        <Link
          href="/"
          className="flex flex-grow font-mono text-lg font-bold tracking-[.3rem] md:hidden"
        >
          {t("common:app-name")}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden flex-grow items-center gap-1 md:flex">
          <Button asChild variant="ghost" className={navButtonClass}>
            <Link href="/">{t("common:navigation.home")}</Link>
          </Button>

          {isAdmin && (
            <>
              <Button asChild variant="ghost" className={navButtonClass}>
                <Link href="/admin-panel/users">
                  {t("common:navigation.users")}
                </Link>
              </Button>
              {/* desktop-menu-items */}
            </>
          )}
        </nav>

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
          <div className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost" className={navButtonClass}>
              <Link href="/sign-in">{t("common:navigation.signIn")}</Link>
            </Button>
            {IS_SIGN_UP_ENABLED && (
              <Button asChild variant="ghost" className={navButtonClass}>
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
