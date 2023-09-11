/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
