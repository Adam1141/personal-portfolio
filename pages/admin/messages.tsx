import { m } from 'framer-motion';
import MessageList from '../../components/MessagesList';
import { sessionValidityCheck, withSessionSsr } from '../../lib/withSession';
import { getAllMessages } from '../api/all-messages';

const Messages = ({ initialMessages }) => {
	return (
		<m.div className="flex h-full w-full flex-col">
			<h1 className="mt-4 mb-8 text-3xl font-semibold">Admin Messages</h1>
			<MessageList initialMessages={initialMessages} />
		</m.div>
	);
};

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps(ctx) {
		const { req } = ctx;
		if (!(await sessionValidityCheck(req.session))) {
			return {
				notFound: true,
			};
		}

		try {
			let allMessages = await getAllMessages();

			/*
				to fix this:
				Error: Error serializing `.initialMessages[0].createdAt` returned from `getServerSideProps` in "/admin/messages".
				Reason: `object` ("[object Date]") cannot be serialized as JSON. Please only return JSON serializable data types.
			*/
			allMessages = allMessages.map((msg) => {
				Object.entries(msg).forEach(([k, v]) => {
					if (Object.prototype.toString.call(v) === '[object Date]') {
						// @ts-ignore
						msg[k] = v.toISOString();
					}
				});
				return msg;
			});

			return { props: { initialMessages: allMessages ?? [] } };
		} catch (e) {
			console.log(e);
			return { props: { initialMessages: [] } };
		}
	},
);

export default Messages;
