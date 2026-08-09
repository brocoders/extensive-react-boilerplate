"use client";

export type AuthEvent = { type: "login" } | { type: "logout" };

type AuthEventListener = (event: AuthEvent) => void;

const listeners = new Set<AuthEventListener>();

// Cookies fire no "storage" events, so other tabs cannot observe auth changes
// through the shared cookie alone — a BroadcastChannel carries login/logout
// notifications between tabs instead.
const channel =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel("auth")
    : null;

if (channel) {
  channel.onmessage = (event: MessageEvent<AuthEvent>) => {
    listeners.forEach((listener) => listener(event.data));
  };
}

export function emitAuthEvent(event: AuthEvent) {
  // BroadcastChannel does not deliver messages to the emitting context, so
  // local listeners are notified explicitly.
  listeners.forEach((listener) => listener(event));
  channel?.postMessage(event);
}

export function onAuthEvent(listener: AuthEventListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}
