/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['gsap', '@studio-freight/lenis', 'lenis'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      }
    ],
  },
};

export default nextConfig;
