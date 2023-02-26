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
};

module.exports = nextConfig;
