import { FC, Fragment, SetStateAction } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MessageType } from '../@types/types';
import TextInput from './TextInput';
import { MdLabelImportantOutline } from 'react-icons/md';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import dayjs from 'dayjs';
import { m } from 'framer-motion';
import { T_STEP_S } from '../constants';
import copy from 'copy-to-clipboard';
import { FiCopy } from 'react-icons/fi';

interface IMessageInfoModalProps {
	msg: MessageType | null;
	isOpen: boolean;
	setIsOpen: React.Dispatch<SetStateAction<boolean>>;
	className?: string;
}

const MessageInfoModal: FC<IMessageInfoModalProps> = ({
	msg,
	isOpen,
	setIsOpen,
	className,
}) => {
	return (
		<Transition
			show={isOpen && msg !== null}
			as={Fragment}
			enter="transition duration-200 ease-out"
			enterFrom="transform scale-95 opacity-0"
			enterTo="transform scale-100 opacity-100"
			leave="transition duration-200 ease-out"
			leaveFrom="transform scale-100 opacity-100"
			leaveTo="transform scale-95 opacity-0"
		>
			<Dialog
				className={`fixed top-0 left-0 h-screen w-screen text-sm ${
					className ?? ''
				}`}
				style={{ zIndex: '999999' }}
				as="div"
				onClose={() => setIsOpen(false)}
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<div className="fixed inset-0 bg-black/50" aria-hidden="true" />
				<Dialog.Panel
					style={{ zIndex: '999999' }}
					className={`absolute top-1/2 left-1/2 flex h-full max-h-3xl w-full min-w-72 max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-lg bg-indigo-200 p-5 text-gray-900 dark:bg-gray-800 dark:text-gray-200 sm:h-3/4 sm:w-3/4 ${
						className ?? ''
					}`}
				>
					<Dialog.Title className={`text-xl font-semibold`}>Message</Dialog.Title>

					<div
						className={`custom-scrollbar flex w-full flex-1 flex-col gap-4 overflow-y-scroll pt-5`}
					>
						{/* createdAt div */}
						<div className="w-full">
							<p className="flex">
								<span className="font-semibold text-gray-200 text-opacity-70">
									Received At:
								</span>
								<span className="pl-4 font-mono">
									{dayjs(msg?.createdAt ?? 0).valueOf() === 0
										? 'Not Available'
										: dayjs(msg?.createdAt ?? 0).format('YYYY-MM-DD HH:mm:ss [on] dddd')}
								</span>
							</p>
						</div>
						<div className="w-full">
							<p className="flex gap-2">
								<span className="font-semibold text-gray-200 text-opacity-70">
									From:
								</span>
								<span className="max-w-96 truncate font-mono">
									{msg?.name ?? ''}
								</span>
							</p>
						</div>
						<div className="w-full">
							<p className="flex gap-2">
								<span className="font-semibold text-gray-200 text-opacity-70">
									Email:
								</span>
								<span className="max-w-96 truncate font-mono">
									{msg?.email ?? ''}
								</span>
								<span
									onClick={(e) => {
										e.stopPropagation();
										copy(msg.email);
									}}
									className="text-xl transition-opacity duration-200 hover:!opacity-70 group-hover:opacity-100 cursor-pointer"
								>
									<FiCopy />
								</span>
							</p>
						</div>

						{/* message textarea */}
						<m.textarea
							disabled
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: T_STEP_S * 2 }}
							exit={{ opacity: 0, x: 100 }}
							className="custom-scrollbar h-full max-h-96 overflow-hidden overflow-y-auto rounded-lg border-2 border-gray-500 bg-transparent px-4 py-2 transition-colors duration-200 focus:!border-indigo-700 focus:!outline-none"
							name="Message"
							id="message"
							cols={30}
							rows={10}
							defaultValue={msg?.message}
							placeholder={`message..`}
						></m.textarea>
					</div>

					<div
						onClick={() => {
							setIsOpen(false);
						}}
						className="cursor-pointer text-5xl transition-opacity duration-200 hover:opacity-50"
					>
						<IoIosCloseCircleOutline />
					</div>
				</Dialog.Panel>
			</Dialog>
		</Transition>
	);
};

export default MessageInfoModal;
