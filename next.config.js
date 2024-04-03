/** @type {import('next').NextConfig} */
let nextConfig = {
  experimental: {
    optimizePackageImports: ['@nextui-org/react', 'ethers'],
    serverComponentsExternalPackages: ['header-generator'],
  },
  transpilePackages: ['@solana/web3.js'],
  reactStrictMode: true,
  output: 'standalone',
  generateBuildId: async () => process.env.COMMIT_SHA || 'dev',
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };

    return config;
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = require('@next/bundle-analyzer')({
    enabled: true,
  })(nextConfig);
}

module.exports = nextConfig;
