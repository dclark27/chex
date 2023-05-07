/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		appDir: true,
		typedRoutes: true,
	},
};

module.exports = nextConfig;
