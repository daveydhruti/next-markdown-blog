/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath only for production (GitHub Pages)
  basePath: process.env.NODE_ENV === 'production' ? '/blog' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
