import dayjs from 'dayjs';
import schedule from 'node-schedule';
import prisma from './prisma';

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
	schedule.scheduleJob('* 20 * * *', async () => {
		console.log(
			`time now is ${new Date().toISOString()} - number of messages in the past 24 hours -> ${await countOfMessagesPast24Hours()}`,
		);
	});
}

initCheckAndNotify();
