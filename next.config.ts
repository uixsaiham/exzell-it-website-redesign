import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static export served from https://uixsaiham.github.io/exzell-it-website-redesign/.
const pagesBasePath = "/exzell-it-website-redesign";
const isPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  ...(isPagesBuild && {
    output: "export",
    basePath: pagesBasePath,
    trailingSlash: true,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath },
  }),
};

export default nextConfig;
