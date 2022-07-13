import dayjs from 'dayjs';
import { DateRange } from 'materialui-daterange-picker';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { FC, SetStateAction, useState } from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { MessagesFilter, MessageShowType, MessageType } from '../@types/types';
import { validateSearchMessagesFilter } from '../lib/otherHelpersFE';
import CustomDateRangePicker from './CustomDateRangePicker';
import TextInput from './TextInput';
import isNumber from 'is-number';

interface IMessagesControlProps {
	setMessages: React.Dispatch<SetStateAction<MessageType[]>>;
}

/*
	show?: 'read' | 'unread' | 'all';
	time?: {
		start?: number;
		end?: number;
	};
	name?: string;
	email?: string;
	skip?: number;
	limit?: number;
*/

const showOptions: MessageShowType[] = ['all', 'read', 'unread'];

const MessagesControl: FC<IMessagesControlProps> = ({ setMessages }) => {
	const [show, setShow] = useState<MessageShowType>('all');
	const [time, setTime] = useState(undefined);
	const [name, setName] = useState(undefined);
	const [email, setEmail] = useState(undefined);
	const [skip, setSkip] = useState<number>(0);
	const [limit, setLimit] = useState<number>(0);

	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [dateRange, setDateRange] = useState<DateRange>({});

	const router = useRouter();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	function handleSetSkip(val) {
		if (val === '') setSkip(0);
		if (!isNumber(parseInt(val))) return;
		const newNum = parseInt(val);
		if (newNum <= 0) {
			setSkip(0);
			return;
		}
		setSkip(newNum);
	}

	function handleSetLimit(val) {
		if (val === '') setLimit(0);
		if (!isNumber(parseInt(val))) return;
		const newNum = parseInt(val);
		if (newNum <= 0) {
			setLimit(0);
			return;
		}
		setLimit(newNum);
	}

	function getFilterFromStates() {
		const filter: MessagesFilter = {
			show,
			name,
			email,
			skip,
			limit,
			time,
		};

		Object.keys(filter).forEach((k) => {
			if (
				filter[k] === null ||
				(typeof filter[k] === 'string' && filter[k] === '')
			) {
				filter[k] = undefined;
			}
		});

		if (dateRange?.startDate && dateRange?.endDate) {
			filter.time = {
				start: dateRange.startDate.valueOf(),
				end: dateRange.endDate.valueOf(),
			};
		}

		validateSearchMessagesFilter(filter);

		// console.log('filter -> ', filter);

		return filter;
	}

	// function showFetchedMessagesSnackbar() {
	// 	enqueueSnackbar(
	// 		`${
	// 			messages && messages.length > 0
	// 				? `${messages.length} messages found`
	// 				: `no messages found`
	// 		} `,
	// 		{
	// 			variant: messages && messages.length > 0 ? 'success' : 'warning',
	// 			anchorOrigin: {
	// 				horizontal: 'center',
	// 				vertical: 'top',
	// 			},
	// 			className: `${
	// 				messages && messages.length > 0 ? `!bg-indigo-500` : `!bg-yellow-600`
	// 			}`,
	// 		},
	// 	);
	// }

	async function handleSearchMessages() {
		try {
			const filter = getFilterFromStates();

			const result = await fetch('/api/all-messages', {
				method: 'POST',
				body: JSON.stringify(filter),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((response) => response.json());

			if (!result.ok) throw new Error(result?.msg ?? 'Something went wrong');

			const newMessages = result?.messages ?? [];
			// console.log('newMessages -> ', newMessages);
			setMessages(newMessages);

			const successMsg =
				newMessages.length === 0
					? 'no messages found'
					: `${newMessages.length} messages found`;

			enqueueSnackbar(successMsg, {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
				className: newMessages.length === 0 ? '!bg-yellow-600' : '!bg-indigo-500',
			});
		} catch (e) {
			enqueueSnackbar(e.message, {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		}
	}

	return (
		<div
			className={`flex  flex-wrap gap-4 rounded-md bg-gray-500 bg-opacity-30 p-5 children:flex-1`}
		>
			{/* which messages to show (all / read / unread) div*/}
			<div
				className={`flex h-fit flex-none items-center overflow-hidden rounded-md`}
			>
				{showOptions.map((o) => {
					return (
						<div
							key={o}
							onClick={() => {
								setShow(o);
							}}
							className={`cursor-pointer bg-indigo-600 px-2 py-1 transition-all duration-200 hover:bg-opacity-80 ${
								show === o ? 'bg-indigo-800 bg-opacity-50' : ''
							}`}
						>
							{o}
						</div>
					);
				})}
			</div>

			{/* where name contains div */}
			<div className={`h-fit`}>
				<TextInput
					inputFor={'Name'}
					inputType={'text'}
					inputValue={name}
					setInputValue={setName}
					showClearKey
				/>
			</div>

			{/* where email contains div */}
			<div className={`h-fit`}>
				<TextInput
					inputFor={'Email'}
					inputType={'text'}
					inputValue={email}
					setInputValue={setEmail}
					showClearKey
				/>
			</div>

			{/* skip # first results div */}
			<div className={`h-fit`}>
				<TextInput
					inputFor={'Skip'}
					inputType={'text'}
					inputValue={skip === 0 ? '' : '' + skip}
					setInputValue={handleSetSkip}
					showClearKey
				/>
			</div>

			{/* limit to first # results div */}
			<div className={`h-fit`}>
				<TextInput
					inputFor={'Limit'}
					inputType={'text'}
					inputValue={limit === 0 ? '' : '' + limit}
					setInputValue={handleSetLimit}
					showClearKey
				/>
			</div>

			{/* date range picker */}
			<div className="relative flex w-fit flex-2 flex-wrap items-center gap-5">
				<div className="flex w-fit items-center gap-5">
					<p className="font-semibold">from</p>
					<p
						onClick={() => {
							setIsDatePickerOpen((cur) => !cur);
						}}
						className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border-2 border-gray-900 px-4 py-1.5 text-center font-semibold transition-all duration-200 hover:!border-opacity-50 dark:border-gray-200"
					>
						{dateRange.startDate
							? dayjs(dateRange.startDate).format('YYYY-MM-DD')
							: 'start date'}
						<span className="text-2xl">
							<AiTwotoneCalendar />
						</span>
					</p>
				</div>
				<div className="flex w-fit items-center gap-5">
					<p className="font-semibold">to</p>
					<p
						onClick={() => {
							setIsDatePickerOpen((cur) => !cur);
						}}
						className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg border-2 border-gray-900 px-4 py-1.5 text-center font-semibold transition-all duration-200 hover:!border-opacity-50 dark:border-gray-200"
					>
						{dateRange.endDate
							? dayjs(dateRange.endDate).format('YYYY-MM-DD')
							: 'end date'}
						<span className="text-2xl">
							<AiTwotoneCalendar />
						</span>
					</p>
				</div>
				<p
					onClick={() => setDateRange({})}
					className="cursor-pointer self-end rounded-md bg-gray-500 bg-opacity-50 px-2 text-sm transition-all duration-200 hover:bg-opacity-80"
				>
					reset dates
				</p>
				<CustomDateRangePicker
					className="custom-scrollbar absolute top-0 left-0 max-w-72 overflow-scroll rounded-md bg-white focus:z-50 md:max-w-2xl "
					wrapperClassName="w-full"
					dateRange={dateRange}
					setDateRange={setDateRange}
					isOpen={isDatePickerOpen}
					setIsOpen={setIsDatePickerOpen}
				/>
			</div>

			{/* apply filter button */}
			<button
				onClick={() => handleSearchMessages()}
				className="h-fit flex-none self-center rounded-full bg-indigo-500 bg-opacity-40 px-6 py-1 transition-all duration-200 hover:bg-opacity-70"
			>
				Apply
			</button>
		</div>
	);
};

export default MessagesControl;
