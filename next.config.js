// const { initCheckAndNotify } = require('./lib/checkAndNotify.ts');
// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
};

module.exports = () => {
	// call endpoint to start jobs
	// at the moment i could not find another good solution
	// today is 2022-07-12 Tuesday
	setTimeout(() => {
		fetch(`${process.env.SERVER}/api/start-jobs`, {
			method: 'POST',
		});
	}, 60 * 1000);
	return nextConfig;
};
