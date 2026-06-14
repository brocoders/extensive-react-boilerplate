"use client";
import useAuth from "@/services/auth/use-auth";
import withPageRequiredAuth from "@/services/auth/with-page-required-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "@/components/link";
import { useTranslation } from "@/services/i18n/client";

function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation("profile");
  const initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");

  return (
    <div className="mx-auto w-full max-w-xl px-4">
      <div className="flex gap-6 pt-6">
        <div>
          <Avatar className="size-40" data-testid="user-icon">
            <AvatarImage
              src={user?.photo?.path}
              alt={user?.firstName + " " + user?.lastName}
            />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow">
          <h1 className="mb-2 text-3xl font-semibold" data-testid="user-name">
            {user?.firstName} {user?.lastName}
          </h1>
          <p
            className="mb-4 text-xl text-muted-foreground"
            data-testid="user-email"
          >
            {user?.email}
          </p>
          <div>
            <Button asChild data-testid="edit-profile">
              <Link href="/profile/edit">{t("profile:actions.edit")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withPageRequiredAuth(Profile);
