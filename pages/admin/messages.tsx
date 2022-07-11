import { m } from 'framer-motion';
import { env } from 'process';
import MessageList from '../../components/MessagesList';

const Messages = ({ initialMessages }) => {
	return (
		<m.div className="flex h-full w-full flex-col">
			<h1 className="mt-4 mb-8 text-3xl font-semibold">Admin Messages</h1>
			<MessageList initialMessages={initialMessages} />
		</m.div>
	);
};

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`${env.SERVER}/api/all-messages`).then((response) =>
		response.json(),
	);

	return { props: { initialMessages: res?.messages ?? [] } };
}

export default Messages;
