/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // TODO: 린트 에러들 처리 후 제거
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
