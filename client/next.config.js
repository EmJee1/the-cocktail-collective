/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				pathname: '/the-cocktail-collective-images/**',
			},
		],
	},
}

module.exports = nextConfig
