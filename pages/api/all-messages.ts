import prisma from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== 'GET') {
		return res.send({
			ok: false,
			msg: `The HTTP ${req.method} method is not supported at this route.`,
		});
	}
	try {
		const allMessages = await prisma.message.findMany();
		// console.log('allMessages: ', allMessages);
		return res.send({ ok: true, allMessages });
	} catch {
		return res.send({ ok: false });
	}
}
