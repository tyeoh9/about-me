import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the dev-tools badge out of verify-app screenshots.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
