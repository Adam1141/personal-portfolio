import dayjs from 'dayjs';
import schedule from 'node-schedule';
import { sendEmail } from './mailGunClient';
import prisma from './prisma';

// if initCheckAndNotify ran or not
let started = false;

async function countOfMessagesPast24Hours(): Promise<number> {
	const count = await prisma.message.count({
		where: {
			createdAt: {
				gte: dayjs()
					.subtract(24 * 60 + 1, 'minutes')
					.toISOString(),
			},
		},
	});
	return count;
}

async function areThereNewMessagesPast24Hours(): Promise<boolean> {
	const areThere: boolean = (await countOfMessagesPast24Hours()) >= 1;
	return areThere;
}

export async function initCheckAndNotify() {
	console.log(`initCheckAndNotify() ran at ${new Date().toISOString()} .`);

	// cancel all previously scheduled jobs
	await schedule.gracefulShutdown();

	// schedule new jobs
	// schedule.scheduleJob('*/1 * * * * *', () => {
	// 	console.log(`it is ${Date.now()} right now.`);
	// });


	// every day at 8p.m check if there are any messages
	// send me an email if there are any new messages
	schedule.scheduleJob('0 20 * * *', async () => {
		const msgCount = await countOfMessagesPast24Hours();
		if (msgCount >= 0) {
			await sendEmail(
				process.env.EMAIL_TO_NOTIFY,
				'New Messages',
				`You have ${msgCount} new messages. \n${process.env.SERVER}/cant-touch-dis/login`,
			);
		}
	});
}

if (!started) {
	started = true;
	initCheckAndNotify();
}
