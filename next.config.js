/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src", "playwright-tests"],
  },
};

module.exports = nextConfig;
