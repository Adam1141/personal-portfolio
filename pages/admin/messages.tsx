import dayjs from 'dayjs';
import { m } from 'framer-motion';
import { readFileSync } from 'fs';
import { NextServer } from 'next/dist/server/next';
import { useRouter } from 'next/router';
import { NextResponse } from 'next/server';
import path from 'path';
import { env } from 'process';
import { useEffect } from 'react';
import MessageList from '../../components/MessagesList';
import { withSessionSsr } from '../../lib/withSession';

const Messages = ({ initialMessages, isAdmin }) => {
	const router = useRouter();
	useEffect(() => {
		if (!isAdmin) router.push('/');
	}, []);
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
			return { props: { initialMessages: [], isAdmin: false } };
		}

		const res = await fetch(`${env.SERVER}/api/all-messages`).then((response) =>
			response.json(),
		);

		return { props: { initialMessages: res?.messages ?? [], isAdmin: true } };
	},
);

export default Messages;
