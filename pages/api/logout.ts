import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../lib/withSession';

export default withSessionRoute(handler);
async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.send({
			ok: false,
			msg: `The HTTP ${req.method} method is not supported at this route.`,
		});
	}

	try {
		await req.session.destroy();
		res.send({ ok: true });
	} catch (e) {
		return res.send({ ok: false, msg: e.message });
	}
}
