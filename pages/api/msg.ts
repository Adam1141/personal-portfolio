import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

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
