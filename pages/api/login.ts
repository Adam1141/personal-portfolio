import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { SESSION_VALIDITY_S } from '../../constants';
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
		if (
			bcrypt.compareSync(req.body.username, process.env.ADMIN_USERNAME) &&
			bcrypt.compareSync(req.body.password, process.env.ADMIN_PASSWORD)
		) {
			req.session.isAdmin = true;
			req.session.validUntil = dayjs().add(SESSION_VALIDITY_S, 'second').valueOf();
			await req.session.save();
			return res.send({ ok: true, msg: 'login successful' });
		} else {
			throw new Error('incorrect username or password');
		}
	} catch (e) {
		return res.send({ ok: false, msg: e.message });
	}
}
