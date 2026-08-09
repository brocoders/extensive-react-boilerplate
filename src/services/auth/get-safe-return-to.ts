/**
 * Resolves a `returnTo` query parameter to a path guaranteed to stay on the
 * current origin, falling back when it does not.
 *
 * Prefix checks are not enough. Browsers strip ASCII tab, LF and CR while
 * parsing a URL, so `?returnTo=/%09/evil.com` arrives here as "/\t/evil.com":
 * it starts with "/", does not start with "//" or "/\", and still resolves to
 * "//evil.com" once the router parses it. Parsing the value with the same URL
 * parser the router uses and comparing origins is what actually closes the
 * open redirect.
 */
function getSafeReturnTo(
  requestedReturnTo: string | null | undefined,
  fallback: string
): string {
  if (
    requestedReturnTo === null ||
    requestedReturnTo === undefined ||
    requestedReturnTo === ""
  ) {
    return fallback;
  }

  try {
    const origin = window.location.origin;
    const url = new URL(requestedReturnTo, origin);

    // Covers "//host", "/\host", "https://host", "javascript:" (origin
    // "null") and any control-character variant of them.
    if (url.origin !== origin) {
      return fallback;
    }

    // Hand the router a path rather than the raw value, so a same-origin
    // absolute URL is normalized instead of being re-parsed downstream.
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    // Unparseable value, or no `window` — never navigate on either.
    return fallback;
  }
}

export default getSafeReturnTo;
