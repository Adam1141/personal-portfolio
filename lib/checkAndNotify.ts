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

export async function initCheckAndNotify(): Promise<boolean> {
	if (started) return true;
	console.log(`initCheckAndNotify() ran at ${new Date().toISOString()} .`);

	// cancel all previously scheduled jobs
	await schedule.gracefulShutdown();

	// schedule new jobs
	// schedule.scheduleJob('*/1 * * * * *', () => {
	// 	console.log(`it is ${Date.now()} right now.`);
	// });

	// every day at 5p.m UTC check if there are any messages
	// send me an email if there are any new messages
	const rule = new schedule.RecurrenceRule();
	rule.hour = 17;
	rule.minute = 0;
	rule.tz = 'Etc/UTC';

	schedule.scheduleJob(rule, async () => {
		const msgCount = await countOfMessagesPast24Hours();
		if (msgCount > 0) {
			await sendEmail(
				process.env.EMAIL_TO_NOTIFY,
				'New Messages',
				`You have ${msgCount} new messages. \n${process.env.SERVER}/cant-touch-dis/login`,
			);
		}
	});
	started = true;
	return true;
}
