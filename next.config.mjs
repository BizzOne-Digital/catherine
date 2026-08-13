/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  typescript: {
    // Type checking handled separately — build will not fail on TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint handled separately
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
