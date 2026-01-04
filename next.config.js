/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/PG-Pets',
  assetPrefix: '/PG-Pets',
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig
