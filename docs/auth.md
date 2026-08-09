# Auth

## Table of Contents <!-- omit in toc -->

- [Auth](#auth)
  - [Token storage](#token-storage)
  - [Token refresh](#token-refresh)
  - [Cross-tab behavior](#cross-tab-behavior)
  - [Logout](#logout)
  - [Auth via Google](#auth-via-google)

## Token storage

After sign-in the API returns `token`, `refreshToken`, and `tokenExpires`. They are stored as JSON in a single cookie (`auth-token-data`, see `src/services/auth/auth-tokens-info.ts`) written with:

| Attribute  | Value                                      | Why                                                                                           |
| ---------- | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `path`     | `/`                                        | available on every route                                                                      |
| `expires`  | 30 days (`AUTH_TOKEN_COOKIE_EXPIRES_DAYS`) | matches the backend `AUTH_REFRESH_TOKEN_EXPIRES_IN`, so the session survives browser restarts |
| `sameSite` | `lax`                                      | not sent on cross-site subrequests                                                            |
| `secure`   | set on `https:` pages                      | never transmitted over plain HTTP in production                                               |

The cookie is readable by JavaScript by design — requests attach the token via the `Authorization` header (`src/services/api/use-fetch.ts`), and the API never reads cookies, which also makes CSRF a non-issue for this setup.

A cookie (rather than `localStorage`) is used so auth can later be shared between subdomains: `localStorage` is strictly per-origin, while a cookie can be scoped to a parent domain. To enable sharing, add a `domain` option (e.g. `.example.com`) to `cookieOptions()` — it applies to both `set` and `remove`.

## Token refresh

`useFetch` (`src/services/api/use-fetch.ts`) refreshes tokens in two ways:

- **Proactively** — when `tokenExpires` is less than 60 seconds away, a refresh runs before the request goes out.
- **Reactively** — when a request still returns `401` (revoked session, clock skew, token expired mid-flight), the wrapper refreshes once and retries the request once.

Concurrent refreshes are de-duplicated within a tab and serialized across tabs with the Web Locks API, so two tabs cannot both consume the same single-use refresh token. A refresh that fails with a network error keeps the current tokens (nobody is logged out for being offline); a `401`/`422` from the refresh endpoint clears them and broadcasts a logout to all tabs.

## Cross-tab behavior

The cookie is shared between same-site tabs, so refreshed tokens are picked up automatically. Login and logout additionally broadcast events over a `BroadcastChannel` (`src/services/auth/auth-events.ts`): other tabs update their user state and clear the TanStack Query cache without a reload.

## Logout

`logOut` calls `POST /v1/auth/logout` and then always clears the cookie and the query cache — even when the request fails (offline, server down) — so the user is never stuck logged in locally, and the next account on the machine cannot see the previous user's cached data.

## Auth via Google

1. You need a `Client Id`. You can find these pieces of information by going to the [Developer Console](https://console.cloud.google.com/), clicking your project (if you don't have it create project here https://console.cloud.google.com/projectcreate) -> `APIs & services` -> `credentials`.

1. Find Client Id in the `Additional information` section and copy it.

1. Add `Client Id` to `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in `.env.local`

   ```text
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=abc
   ```

1. Add your domains to `Authorized JavaScript origins` like this:
   ![Authorized JavaScript origins](https://github.com/brocoders/extensive-react-boilerplate/assets/6001723/39358495-2c14-4dc3-8685-a33b920bc9de)

   > For local tests or development add both `http://localhost` and `http://localhost:<port_number>`

---

Previous: [Architecture](architecture.md)

Next: [Testing](testing.md)
