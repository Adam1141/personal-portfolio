import { m } from 'framer-motion';
import { useRef, useState } from 'react';
import TextInput from '../components/TextInput';
import { T_STEP_S } from '../constants';
import { useSnackbar } from 'notistack';
import validator from 'validator';

const Contact = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	function getMessageFields() {
		// returns a message object or throws an error
		// with a descriptive message
		const fieldsObj = {
			name,
			email,
			message,
		};

		// check that no fields are empty
		Object.entries(fieldsObj).forEach(([k, v]) => {
			if (typeof v !== 'string' || v.trim() === '') {
				throw new Error(`${k} cannot be empty`);
			}
		});

		// validate email
		if (!validator.isEmail(fieldsObj.email)) {
			throw new Error(`"${fieldsObj.email}" is not a valid email address`);
		}

		return fieldsObj;
	}

	function emptyMessageFields() {
		setName('');
		setEmail('');
		setMessage('');
	}

	async function handleSendMessage() {
		try {
			const msgObj = getMessageFields();
			const result = await fetch('/api/msg', {
				method: 'POST',
				body: JSON.stringify(msgObj),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((response) => response.json());

			if (!result.ok) throw new Error(result?.msg ?? 'Something went wrong');
			emptyMessageFields();
			enqueueSnackbar('message sent', {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
				},
			});
		} catch (e) {
			enqueueSnackbar(e.message, {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
				},
			});
		}
	}

	return (
		<div className="flex">
			<div
				className={`flex w-full max-w-3xl flex-1 flex-col gap-8 px-5 py-10 sm:px-10`}
			>
				<m.div
					initial={{ opacity: 0, x: -50, y: 50 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: T_STEP_S * 4, delay: T_STEP_S * 2 }}
					exit={{ opacity: 0, x: 100 }}
					className="flex w-full max-w-xs children:flex-1"
				>
					<TextInput
						inputFor={'Name'}
						inputType={'text'}
						inputValue={name}
						setInputValue={(val) => {
							// solves some problem with autofill
							setTimeout(() => {
								setName(val);
							}, 0);
						}}
					/>
				</m.div>
				<m.div
					initial={{ opacity: 0, x: -50, y: 50 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: T_STEP_S * 4, delay: T_STEP_S * 3 }}
					exit={{ opacity: 0, x: 100 }}
					className="flex w-full max-w-xs children:flex-1"
				>
					<TextInput
						inputFor={'Email'}
						inputType={'text'}
						inputValue={email}
						setInputValue={(val) => {
							// solves some problem with autofill
							setTimeout(() => {
								setEmail(val);
							}, 0);
						}}
					/>
				</m.div>
				<m.textarea
					initial={{ opacity: 0, x: -50, y: 50 }}
					animate={{ opacity: 1, x: 0, y: 0 }}
					transition={{ duration: T_STEP_S * 4, delay: T_STEP_S * 4 }}
					exit={{ opacity: 0, x: 100 }}
					className="custom-scrollbar h-full max-h-96 overflow-hidden overflow-y-auto rounded-lg border-2 border-gray-500 bg-transparent px-4 py-2 transition-colors duration-200 focus:!border-indigo-700 focus:!outline-none"
					name="Message"
					id="message"
					cols={30}
					rows={10}
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					placeholder={`message..`}
				></m.textarea>
				<m.button
					onClick={() => handleSendMessage()}
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: T_STEP_S * 4, delay: T_STEP_S * 5 }}
					exit={{ opacity: 0, x: 100 }}
					className={`w-40 rounded-md border-2 border-indigo-700 px-6 py-2 font-semibold transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-600 hover:bg-opacity-20`}
				>
					Send
				</m.button>
			</div>
		</div>
	);
};

export default Contact;
