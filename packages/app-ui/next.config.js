/** @type {import('next').NextConfig} */
const nextConfig = {
  // development mode only feature for highlighting potential problems in an application
  reactStrictMode: true,
  images: { unoptimized: true },
  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',

  // Optional: Import packages from workspace
  transpilePackages: ['shared-lib'],
};

module.exports = nextConfig;
