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
    ],
  },
};

export default nextConfig;
