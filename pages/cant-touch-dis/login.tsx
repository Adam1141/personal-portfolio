import { m } from 'framer-motion';
import { useRef, useState } from 'react';
import TextInput from '../../components/TextInput';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { sessionValidityCheck, withSessionSsr } from '../../lib/withSession';

const Login = () => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const passwordRef = useRef<HTMLInputElement | null>(null);
	const usernameRef = useRef<HTMLInputElement | null>(null);
	const loginBtnRef = useRef<HTMLButtonElement | null>(null);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	function getLoginFieldsObj() {
		const fieldsObj = {
			username,
			password,
		};

		// check for empty fields
		Object.entries(fieldsObj).forEach(([k, v]) => {
			if (v.trim() === '') throw new Error(`${k} cannot be empty`);
		});

		return fieldsObj;
	}

	async function handleLogin() {
		try {
			const result = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify(getLoginFieldsObj()),
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((response) => response.json());

			if (!result.ok) {
				throw new Error(
					`${result?.msg ?? 'Something went wrong, try again soon.'}`,
				);
			}

			// all good..
			enqueueSnackbar('login successful', {
				variant: 'success',
				anchorOrigin: {
					horizontal: 'right',
					vertical: 'top',
				},
				className: '!bg-indigo-500',
			});
			setTimeout(() => {
				router.push('/admin/messages');
			}, 1000);
		} catch (e) {
			enqueueSnackbar(`${e.message}`, {
				variant: 'error',
				anchorOrigin: {
					horizontal: 'right',
					vertical: 'top',
				},
			});
		}
	}

	return (
		<m.div className="fixed top-1/4 left-1/2 mx-auto flex h-full max-h-80 w-full max-w-72 -translate-x-1/2 -translate-y-1/4 flex-col items-center gap-8">
			<h1 className="py-4 text-xl font-semibold">Login</h1>
			<m.div className="flex flex-col gap-8">
				<m.div>
					<TextInput
						inputRef={usernameRef}
						onEnterCallback={() => passwordRef.current?.focus()}
						inputFor={'Username'}
						inputType={'text'}
						inputValue={username}
						setInputValue={setUsername}
					/>
				</m.div>
				<m.div>
					<TextInput
						inputRef={passwordRef}
						onEnterCallback={() => loginBtnRef.current?.focus()}
						inputFor={'Password'}
						inputType={'password'}
						inputValue={password}
						setInputValue={setPassword}
					/>
				</m.div>
				<m.button
					ref={loginBtnRef}
					onClick={() => handleLogin()}
					className="rounded-md border-2 border-indigo-700 border-opacity-0 bg-gray-500 bg-opacity-20 px-6 py-2 transition-all duration-300 hover:bg-opacity-50 focus:border-opacity-100 focus:!outline-none focus:!outline-0"
				>
					Say Cheese
				</m.button>
			</m.div>
		</m.div>
	);
};

export const getServerSideProps = withSessionSsr(
	async function getServerSideProps(ctx) {
		if (await sessionValidityCheck(ctx.req.session)) {
			return {
				redirect: {
					destination: `${process.env.SERVER}/admin/messages`,
					permanent: false,
				},
			};
		}
		return {
			props: {},
		};
	},
);

export default Login;
