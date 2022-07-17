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
		const endpoint = `${process.env.LOCAL_SERVER}/api/start-jobs`;
		const result = await fetch(endpoint, {
			method: 'POST',
		})
			.then((response) => response.json())
			.catch(() =>
				console.log(
					`in next.config.js - post to ${endpoint} - start jobs request fail (expected a couple of times)`,
				),
			);

		// jobs started..
		if (result?.ok === true) {
			clearInterval(intervalToken);
		}
	}, 10 * 1000);
	return nextConfig;
};
