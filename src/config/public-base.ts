// Build-time SPA base path (Vite `base`). '/' on the main deployment
// (worldmonitor.app on Vercel) and on localhost dev; '/dashboard_v2/' when
// self-hosted behind a reverse proxy that strips the subpath prefix before
// forwarding (e.g. Tailscale `serve /dashboard_v2` → container root).
//
// Public static assets that source code references with root-absolute paths
// (/data, /textures, /map-styles, /favico, ...) MUST be fetched through this
// prefix: in a subpath deployment the browser resolves '/data/...' against the
// origin root, which belongs to a different app on the shared host, so those
// requests would never reach this bundle. Prefixing keeps every request under
// the subpath mount that is routed to this deployment.
//
// Leaf module (zero imports) so any config/service/component can consume it
// without violating the dependency direction or risking a cycle. Reading
// import.meta.env is guarded because these modules are also loaded by node:test
// runners where import.meta.env does not exist.

const BASE_URL = (() => {
  try {
    return import.meta.env?.BASE_URL as string | undefined ?? '/';
  } catch {
    return '/';
  }
})();

/** True when the app is served from the origin root (not under a subpath). */
export function isRootBasePath(): boolean {
  return BASE_URL === '/';
}

/**
 * Prefix a root-absolute public asset path with the configured base path so it
 * is fetched under this deployment's subpath mount. Root deployments are
 * returned unchanged ('/data/...' stays '/data/...').
 */
export function publicAssetUrl(path: string): string {
  if (!path.startsWith('/')) return path;
  if (BASE_URL === '/') return path;
  return `${BASE_URL.replace(/\/$/, '')}${path}`;
}
