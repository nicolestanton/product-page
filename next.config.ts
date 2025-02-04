import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    disableStaticImages: false,
  },
  sassOptions: {
    includePaths: ['./src/styles'],
  },
};

export default nextConfig;
