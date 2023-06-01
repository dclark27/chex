/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	experimental: {
		serverActions: true,
		appDir: true,
		typedRoutes: true,
	},
};

module.exports = nextConfig;
