import type { NextConfig } from "next";

// GitHub Pages serves the site under /about-me; set PAGES_BASE_PATH for that build only,
// so `pnpm dev` and a Vercel deploy keep serving at /.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Keep the dev-tools badge out of verify-app screenshots.
  devIndicators: false,
  // No cacheComponents / partialPrefetching: PPR can't run in export mode, and the page is fully static.
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  // Exposed to components for root-absolute asset URLs that Next doesn't prefix (CSS mask URLs).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
