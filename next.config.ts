import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash placeholders for hero / about imagery — to be replaced by
    // client-provided photography. See the comments at each <Image> usage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        // YouTube thumbnails for the click-to-load video facade.
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
