import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
	switch (req.method) {
		case 'GET':
			await handleGET(id, res);
			break;
		case 'PUT':
			await handlePUT(id, res);
			break;
		case 'DELETE':
			await handleDELETE(id, res);
			break;
		default:
			return res.send({
				ok: false,
				msg: `The HTTP ${req.method} method is not supported at this route.`,
			});
	}
}

async function handleGET(msgId: string, res: NextApiResponse) {
	try {
		const msg = await prisma.message.findUniqueOrThrow({
			where: {
				id: Number(msgId),
			},
		});
		return res.send({ ok: true, msg });
	} catch {
		return res.send({ ok: false, msg: `Message with id=${msgId} not found.` });
	}
}

async function handlePUT(msgId: string, res: NextApiResponse) {
	try {
		let msg = await prisma.message.findUniqueOrThrow({
			where: {
				id: Number(msgId),
			},
		});

		msg = await prisma.message.update({
			where: {
				id: Number(msgId),
			},
			data: {
				isRead: !msg.isRead,
			},
		});
		// console.log('msg: ', msg);

		return res.send({
			ok: true,
			msg: `Marked message with id=${msgId} as ${msg.isRead ? 'read' : 'unread'}.`,
		});
	} catch {
		return res.send({ ok: false, msg: `Message with id=${msgId} not found.` });
	}
}

async function handleDELETE(msgId: string, res: NextApiResponse) {
	try {
		const msg = await prisma.message.delete({
			where: {
				id: Number(msgId),
			},
		});
		return res.send({ ok: true });
	} catch {
		return res.send({ ok: false, msg: `Message with id=${msgId} not found.` });
	}
}
