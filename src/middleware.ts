import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import {
  fallbackLanguage,
  languages,
  cookieName,
} from "./services/i18n/config";

acceptLanguage.languages([...languages]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1
  ) {
    return NextResponse.next();
  }

  let language;
  if (req.cookies.has(cookieName))
    language = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!language)
    language = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!language) language = fallbackLanguage;

  // Redirect if language in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(
        `/${language}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url
      )
    );
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") ?? "");
    const languageInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (languageInReferer) response.cookies.set(cookieName, languageInReferer);

    return response;
  }

  return NextResponse.next();
}
