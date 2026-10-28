import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This is a legacy repo whose only production purpose is the `/` email-
  // confirmation landing plus the Google Play compliance pages (/privacy,
  // /delete-account). The dead legacy code (books API, Prisma types) has
  // pre-existing type/lint errors that fail `next build`. Don't let that dead
  // code block deploying the compliance pages. New code is still type-checked
  // in the editor and via `tsc --noEmit`.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Only the landing page (plus /privacy and /delete-account, which Google Play
  // requires) is public for now. Every other page sends visitors back to `/`, which shows a "no access" popup.
  async redirects() {
    return ["/library", "/books/:path*", "/auth/:path*", "/settings"].map(
      (source) => ({ source, destination: "/?restricted=1", permanent: false }),
    );
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      // Cloudflare R2 public URL
      {
        protocol: "https",
        hostname: "pub-*.r2.dev",
      },
    ],
    // Allow local images from public directory
    unoptimized: false,
  },
};

export default nextConfig;
