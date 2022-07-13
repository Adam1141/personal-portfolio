import mailgun from 'mailgun-js';

let mg: mailgun.Mailgun | null = null;

function getMailgunClient(): mailgun.Mailgun {
	if (mg !== null) return mg;
	const mgApiKey = process.env.MG_API_KEY;
	const mgDomain = process.env.MG_DOMAIN;
	[mgApiKey, mgDomain].forEach((v) => {
		if (v === undefined)
			throw new Error('some of Mailgun env vars are undefined!!');
	});
	mg = mailgun({ apiKey: mgApiKey!, domain: mgDomain! });
	return mg;
}

export async function sendEmail(
	to: string,
	subject: string,
	content: string,
	isText: boolean = true,
) {
	const data: mailgun.messages.SendData = {
		from: `Adam Portfolio <adam@${process.env.MG_DOMAIN ?? 'mybutterfly.xyz'}>`,
		to: to,
		subject: subject,
		html: isText ? undefined : content,
		text: isText ? content : undefined,
	};

	let mg = getMailgunClient();
	mg.messages().send(data, function (error, body) {
		if (error) {
			console.log('mailgun error: ', error);
			return;
		}
		console.log(body);
	});
}

export default getMailgunClient();
