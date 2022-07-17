import { NextApiRequest, NextApiResponse } from 'next';
import { initCheckAndNotify } from '../../lib/checkAndNotify';

// this route is called from next.config.js
// it starts jobs (with the help of node-schedule)
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
		const started = await initCheckAndNotify();
		return res.send({ ok: started });
	} catch {
		return res.send({ ok: false });
	}
}
