import { Prisma } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import dayjs from 'dayjs';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { MessagesFilter, MessageType } from '../@types/types';
import { MdDeleteForever } from 'react-icons/md';

interface IMessageListProps {
	initialMessages: MessageType[];
}

function getEmptyMessagesFilter(): MessagesFilter {
	return {
		show: 'all',
		name: '',
		email: '',
		time: {},
	};
}

const MessageList: FC<IMessageListProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);
	const [filteredMessages, setFilteredMessages] = useState(messages);

	const [filter, setFilter] = useState<MessagesFilter>(getEmptyMessagesFilter());

	async function handleToggleMessageRead(msg: MessageType) {
		// toggle message read/unread for a given message
		try {
			await fetch(`/api/msg/${msg.id}`, {
				method: 'PUT',
			});
			setMessages((cur) => {
				let atIdx = messages.findIndex((m) => m.id === msg.id);
				if (atIdx === -1) return;
				let updatedMsg = { ...msg, isRead: !msg.isRead };
				let newMessages = [...cur];
				newMessages.splice(atIdx, 1, updatedMsg);
				return newMessages;
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function handleDeleteMessage(msg: MessageType) {
		try {
			await fetch(`/api/msg/${msg.id}`, {
				method: 'DELETE',
			});
			setMessages((cur) => {
				let atIdx = messages.findIndex((m) => m.id === msg.id);
				if (atIdx === -1) return;
				let newMessages = [...cur];
				newMessages.splice(atIdx, 1);
				return newMessages;
			});
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div className="flex w-full flex-1 basis-0 flex-col gap-0">
			<m.div
				className={`flex w-full gap-4 bg-gray-900 px-2 py-2 children:flex-2 children:px-2 children:font-semibold`}
			>
				<p>Name</p>
				<p>Email</p>
				<p>Time</p>
				<p className="flex !flex-1/2 justify-center">Read</p>
				<p className="flex !flex-1/2 justify-center"></p>
			</m.div>
			{messages && messages.length !== 0 ? (
				messages.map((msg, idx) => {
					return (
						<m.div
							className={`group relative flex w-full cursor-pointer items-center gap-4 px-2 py-3 children:flex-2 children:px-2`}
							key={msg.createdAt.toString() + idx}
						>
							<div
								className={`absolute left-0 top-0 h-full !w-1 flex-grow-0 basis-0 overflow-hidden rounded-full bg-indigo-500 !px-0 opacity-0 group-hover:opacity-100`}
							></div>
							<p>{msg.name}</p>
							<p>{msg.email}</p>
							<p>{dayjs(msg.createdAt).format('YYYY-MM-DD HH:mm:ss')}</p>
							<p className="flex !flex-1/2 cursor-pointer justify-center text-xl">
								<span onClick={() => handleToggleMessageRead(msg)} className="w-fit">
									{msg.isRead ? <BsFillCheckSquareFill /> : <ImCheckboxUnchecked />}
								</span>
							</p>
							<p className="flex !flex-1/2 cursor-pointer justify-center text-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100">
								<span
									onClick={() => handleDeleteMessage(msg)}
									className="text-2xl transition-opacity duration-200 hover:opacity-70"
								>
									<MdDeleteForever />
								</span>
							</p>
						</m.div>
					);
				})
			) : (
				<m.div></m.div>
			)}
		</div>
	);
};

export default MessageList;
