import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Navbar from './Navbar';

export default function Layout({ children }) {
	const router = useRouter();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	function shouldHideNavbar() {
		// hide for admin pages
		if (router.pathname.startsWith('/admin')) return true;

		// hide for login page
		if (router.pathname.endsWith('login')) return true;

		return false;
	}

	function shouldShowLogout() {
		if (router.pathname.startsWith('/admin')) return true;
		return false;
	}

	async function handleLogout() {
		try {
			const result = await fetch('/api/logout', {
				method: 'POST',
			}).then((response) => response.json());

			if (!result.ok) {
				throw new Error(
					`${result?.msg ?? 'Something went wrong, try again soon.'}`,
				);
			}

			router.push('/');

			// all good..
			enqueueSnackbar('logout successful', {
				variant: 'success',
				anchorOrigin: {
					horizontal: 'right',
					vertical: 'top',
				},
				className: '!bg-indigo-500',
			});
		} catch (e) {
			enqueueSnackbar(`${e.message}`, {
				variant: 'error',
				anchorOrigin: {
					horizontal: 'center',
					vertical: 'top',
				},
			});
		}
	}

	return (
		<div className="flex h-screen w-screen flex-col">
			<div className="bg-gradient-div fixed z-[-100] bg-indigo-500"></div>
			<div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-y-auto sm:overflow-hidden">
				{!shouldHideNavbar() && <Navbar />}
				{shouldShowLogout() && (
					<button
						onClick={() => handleLogout()}
						className="absolute top-0 right-4 px-4 py-2 font-semibold transition-all duration-300 hover:bg-red-400 hover:bg-opacity-50"
					>
						Logout
					</button>
				)}
				<div id='layout-wrapper' className="flex w-full flex-1 flex-col overflow-hidden">
					{children}
				</div>
			</div>
		</div>
	);
}
