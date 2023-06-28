/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false, // false for react-firebaseui
	swcMinify: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/tests',
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			},
		],
	},
};

module.exports = nextConfig;
