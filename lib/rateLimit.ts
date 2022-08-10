import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

function applyMiddleware(middleware) {
	return (request, response) => {
		return new Promise((resolve, reject) => {
			middleware(request, response, (result) => {
				if (result instanceof Error) reject(result);
				else resolve(result);
			});
		});
	};
}

const getIP = (request) =>
	request.ip ||
	request.headers['x-forwarded-for'] ||
	request.headers['x-real-ip'] ||
	request.connection.remoteAddress;

export const getRateLimitMiddlewares = ({
	limit = 2,
	windowMs = 15 * 60 * 1000,
	delayAfter = Math.round(10 / 2),
	delayMs = 500,
} = {}) => [
	slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
	rateLimit({
		keyGenerator: getIP,
		windowMs,
		max: limit,
		message: {
			ok: false,
			msg: `maximum amount of contact messages reached`,
		},
		standardHeaders: false,
		legacyHeaders: false,
	}),
];

const middlewares = getRateLimitMiddlewares();

function applyRateLimit(request, response) {
	return Promise.all(
		middlewares
			.map(applyMiddleware)
			.map((middleware) => middleware(request, response)),
	);
}

export default applyRateLimit;
