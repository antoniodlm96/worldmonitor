/**
 * Personal mode — de-commercialized self-hosted build.
 *
 * When VITE_LOCAL_UNLOCK=1 the app behaves as a private intelligence tool:
 * every premium panel is unlocked, the Pro banner, "Pricing" links and the
 * login widget are suppressed, and no entitlement checks are enforced
 * client-side. The server must be started with the matching WM_LOCAL_UNLOCK=1
 * so the gateway skips auth/tier gates too.
 */
export function isPersonalMode(): boolean {
  return import.meta.env.VITE_LOCAL_UNLOCK === '1';
}
