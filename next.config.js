// const { initCheckAndNotify } = require('./lib/checkAndNotify.ts');
// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
};

module.exports = () => {
	const intervalToken = setInterval(async () => {
		const result = await fetch(`${process.env.SERVER}/api/start-jobs`, {
			method: 'POST',
		}).then((response) => response.json());

		// jobs started..
		if (result?.ok === true) {
			clearInterval(intervalToken);
		}
	}, 10 * 1000);
	return nextConfig;
};
