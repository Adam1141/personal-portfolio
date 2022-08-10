import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import applyRateLimit from '../../lib/rateLimit';
import { validateMessageFields } from '../../lib/otherHelpersBE';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'POST') {
		return res.send({
			ok: false,
			msg: `The HTTP ${req.method} method is not supported at this route.`,
		});
	}

	try {
		try {
			validateMessageFields({
				name: req.body.name,
				email: req.body.email,
				message: req.body.message,
			});
		} catch (e) {
			return res.send({
				ok: false,
				msg: e.message,
			});
		}

		// rate limit for messages 2 -> 15 minutes
		// if limit is reached will send a response
		// and stop further execution on the req
		await applyRateLimit(req, res);

		const newMsg = await prisma.message.create({
			data: {
				name: req.body.name,
				email: req.body.email,
				message: req.body.message,
			},
		});
		// console.log('newMsg: ', newMsg);
		return res.send({ ok: true });
	} catch (e) {
		console.log(e);
		return res.send({ ok: false, msg: 'Something went wrong, try again soon!' });
	}
}
