import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.ir-thr-at1.arvanstorage.ir",
        pathname: "/olfati/**",
      },
      {
        protocol: "https",
        hostname: "www.cartinoapp.ir",
      },
    ],
    // کش طولانی‌تر برای کاهش فشار روی بهینه‌ساز
    minimumCacheTTL: 60 * 60 * 24, // ۲۴ ساعت
  },
  output: "standalone",

  // typescript: {
  //   ignoreBuildErrors: true // disabled type checking when run command npm run build
  // }
};

export default nextConfig;
