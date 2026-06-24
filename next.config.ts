import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: ["192.168.0.19", "172.20.10.7"],
};

export default nextConfig;
