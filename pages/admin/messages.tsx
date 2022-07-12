import dayjs from 'dayjs';
import { m } from 'framer-motion';
import { env } from 'process';
import MessageList from '../../components/MessagesList';
import { withSessionSsr } from '../../lib/withSession';

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
		if (
			req.session?.isAdmin !== true ||
			(req.session?.validUntil && dayjs(req.session.validUntil).isBefore(dayjs()))
		) {
			await req.session.destroy();
			return {
				notFound: true,
			};
		}

		const res = await fetch(`${env.SERVER}/api/all-messages`).then((response) =>
			response.json(),
		);

		return { props: { initialMessages: res?.messages ?? [] } };
	},
);

export default Messages;
