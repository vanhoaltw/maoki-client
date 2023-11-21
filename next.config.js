/** @type {import('next').NextConfig} */

const hostnames = [];

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  /**
   * Configuration for next/image.
   */
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: hostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

module.exports = nextConfig;
