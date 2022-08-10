import formData from 'form-data';
import Mailgun from 'mailgun.js';
import Client from 'mailgun.js/client';

const mailgun = new Mailgun(formData);

let mg: Client | null = null;

function getMailgunClient(): Client {
	if (mg !== null) return mg;
	const mgApiKey = process.env.MG_API_KEY;
	const mgDomain = process.env.MG_DOMAIN;
	[mgApiKey, mgDomain].forEach((v) => {
		if (v === undefined)
			throw new Error('some of Mailgun env vars are undefined!!');
	});
	mg = mailgun.client({ username: 'api', key: mgApiKey });
	return mg;
}

export async function sendEmail(
	to: string,
	subject: string,
	content: string,
	isText: boolean = true,
) {
	const data = {
		from: `Adam Portfolio <adam@${process.env.MG_DOMAIN ?? 'mybutterfly.xyz'}>`,
		to: to,
		subject: subject,
		html: isText ? undefined : content,
		text: isText ? content : undefined,
	};

	let mg = getMailgunClient();

	mg.messages
		.create(process.env.MG_DOMAIN ?? 'mybutterfly.xyz', data)
		.then(console.log)
		.catch((e) => console.log('mailgun error: ', e.message));
}

export default getMailgunClient();
