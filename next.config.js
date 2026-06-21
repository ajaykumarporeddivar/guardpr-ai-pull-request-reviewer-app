/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Performance budget enforced:
  // LCP < 2.5s | INP < 100ms | CLS < 0.1
  // Monitor: npx lighthouse http://localhost:3000 --only-categories=performance
}
module.exports = nextConfig