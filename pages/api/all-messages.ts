import { NextApiRequest, NextApiResponse } from 'next';
import { sessionValidityCheck, withSessionRoute } from '../../lib/withSession';
import { getAllMessages } from '../../lib/otherHelpersBE';

export default withSessionRoute(handler);
async function handler(req: NextApiRequest, res: NextApiResponse) {
	// check if authorized
	await sessionValidityCheck(req.session);
	if (req.session?.isAdmin !== true) {
		return res.send({
			ok: false,
			msg: `Unauthorized`,
		});
	}

	if (req.method !== 'POST') {
		return res.send({
			ok: false,
			msg: `The HTTP ${req.method} method is not supported at this route.`,
		});
	}
	try {
		const allMessages = await getAllMessages(req.body);
		// console.log('allMessages: ', allMessages);
		return res.send({ ok: true, messages: allMessages });
	} catch (e) {
		return res.send({ ok: false, msg: e.message });
	}
}

