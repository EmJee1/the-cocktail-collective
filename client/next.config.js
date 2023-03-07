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
			{
				protocol: 'https',
				hostname: 'baconmockup.com',
				pathname: '/300/300/**',
			},
		],
	},
}

module.exports = nextConfig
