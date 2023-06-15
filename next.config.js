// next.config.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  images: {
    domains: [
      'img.youtube.com',
      'avatars.githubusercontent.com',
      'github.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com',
      'res.cloudinary.com',
    ],
  },
  productionBrowserSourceMaps: false,
  redirects: require('./next-redirect'),
  reactStrictMode: true,
}

module.exports = withContentlayer(nextConfig)
