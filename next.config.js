/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath only for production (GitHub Pages)
  basePath: process.env.NODE_ENV === 'production' ? '/next-markdown-blog' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
