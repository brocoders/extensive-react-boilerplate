/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src", "cypress/e2e"],
  },
};

module.exports = nextConfig;
