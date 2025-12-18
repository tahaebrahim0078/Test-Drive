import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "kia.com.eg",
      },
      {
        protocol: "https",
        hostname: "tmna.aemassets.toyota.com",
      },
      {
        protocol: "https",
        hostname: "www.mgmotor.com.eg",
      },
    ],
  },
};

export default nextConfig;
