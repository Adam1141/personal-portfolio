import { Prisma } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import dayjs from 'dayjs';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { MessagesFilter, MessageType } from '../@types/types';
import { MdDeleteForever } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';
import MessageInfoModal from './MessageInfoModal';
import MessagesControl from './MessagesControl';

interface IMessageListProps {
	initialMessages: MessageType[];
}

const MessageList: FC<IMessageListProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);

	// to view message content (in a modal component)
	const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
	const [currentMessage, setCurrentMessage] = useState<MessageType | null>(null);

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

	function handleShowMessage(msg: MessageType) {
		setIsMessageModalOpen(true);
		setCurrentMessage(msg);

		// toggle isRead of first time opening only
		if (!msg.isRead) {
			handleToggleMessageRead(msg);
		}
	}

	return (
		<div className="custom-scrollbar max-w-screen flex h-screen w-full flex-none flex-col overflow-x-hidden overflow-y-auto sm:!overflow-y-hidden">
			<MessagesControl setMessages={setMessages} />

			<div className="w-full overflow-x-auto overflow-y-hidden flex-none !h-[80vh]">
				{/* list header row div */}
				<m.div
					className={`flex min-w-5xl gap-4 bg-gray-900 px-2 py-2 children:px-2 children:font-semibold `}
				>
					<p className="flex-1">Name</p>
					<p className="flex-2">Email</p>
					<p className="flex-2">Time</p>
					<p className="flex !flex-1/2 justify-center">Read</p>
					<p className="flex !flex-1/2 justify-center"></p>
				</m.div>

				{/* rows container */}
				<div className="custom-scrollbar flex min-w-5xl min-h-96 sm:max-h-5xl max-h-xl flex-col overflow-y-auto">
					{/* message rows */}
					{messages && messages.length !== 0 ? (
						messages.map((msg, idx) => {
							return (
								<m.div
									onClick={() => handleShowMessage(msg)}
									className={`group relative flex w-full cursor-pointer items-center gap-4 px-2 py-3 children:px-2 `}
									key={msg.createdAt.toString() + idx}
								>
									<div
										className={`absolute left-0 top-0 h-full !w-1 flex-grow-0 basis-0 overflow-hidden rounded-full bg-indigo-500 !px-0 opacity-0 group-hover:opacity-100`}
									></div>
									<p className="flex flex-1 overflow-hidden">
										<span className="w-[90%] truncate">{msg.name}</span>
									</p>
									<p className="group flex flex-2 items-center gap-2 overflow-hidden">
										<span className="w-[80%] truncate">{msg.email}</span>
										<span
											onClick={(e) => {
												e.stopPropagation();
												copy(msg.email);
											}}
											className="text-xl transition-opacity duration-200 hover:!opacity-70 group-hover:opacity-100 sm:opacity-0"
										>
											<FiCopy />
										</span>
									</p>
									<p className="flex-2 font-mono text-sm">
										{dayjs(msg.createdAt).format('YYYY-MM-DD HH:mm:ss')}
									</p>
									<p className="flex !flex-1/2 cursor-pointer justify-center text-xl">
										<span
											onClick={(e) => {
												e.stopPropagation();
												handleToggleMessageRead(msg);
											}}
											className="w-fit"
										>
											{msg.isRead ? <BsFillCheckSquareFill /> : <ImCheckboxUnchecked />}
										</span>
									</p>
									<p className="flex !flex-1/2 cursor-pointer justify-center text-xl transition-opacity duration-200 group-hover:opacity-100 sm:opacity-0">
										<span
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteMessage(msg);
											}}
											className="text-2xl transition-opacity duration-200 hover:opacity-70"
										>
											<MdDeleteForever />
										</span>
									</p>
								</m.div>
							);
						})
					) : (
						<m.div className="py-6 text-center font-semibold">No messages yet</m.div>
					)}
				</div>
			</div>

			{/* single message modal */}
			<MessageInfoModal
				msg={currentMessage}
				isOpen={isMessageModalOpen}
				setIsOpen={setIsMessageModalOpen}
			/>
		</div>
	);
};

export default MessageList;
