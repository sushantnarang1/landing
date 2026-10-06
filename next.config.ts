import type { NextConfig } from "next";

const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : "standalone",
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: staticExport ? "true" : "false",
  },
  ...(staticExport && {
    basePath: process.env.NEXT_BASE_PATH ?? "",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
