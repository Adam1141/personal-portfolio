import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { GITHUB_URL, LINKEDIN_URL, T_PAGE_SWAP_S } from '../constants';
import { m } from 'framer-motion';

export default function Home() {
	return (
		<div className="flex h-full flex-col gap-4 p-10 sm:pl-20 sm:pt-40">
			<h1 className="mb-6 flex flex-col gap-4 font-finlandica text-5xl">
				<span className="">Hi, I'm Adam.</span>
				<span className="text-gray-400">A Full Stack Developer</span>
				<span className="text-gray-600">based in Israel.</span>
			</h1>

			<m.p
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: T_PAGE_SWAP_S * 2, delay: T_PAGE_SWAP_S }}
				className="mb-4 w-full max-w-lg leading-7"
			>
				I'm probably the most passionate developer you will ever get to work with.
				If you have a great project that needs some amazing skills, I'm your guy.
			</m.p>

			{/* github link */}
			<m.a
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: T_PAGE_SWAP_S * 2, duration: T_PAGE_SWAP_S }}
				href={GITHUB_URL}
				className="group flex w-fit items-center gap-2 px-2 py-1 text-3xl children:text-gray-200 "
			>
				<BsGithub className="transition-opacity duration-1000 group-hover:opacity-50" />
				<p className="w-0 overflow-hidden text-2xl transition-all duration-500 group-hover:w-32 group-hover:text-opacity-70">
					GitHub
				</p>
			</m.a>

			{/* linkedin link */}
			<m.a
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: T_PAGE_SWAP_S * 3, duration: T_PAGE_SWAP_S }}
				href={LINKEDIN_URL}
				className="group flex w-fit items-center gap-2 px-2 py-1 text-3xl children:text-gray-200"
			>
				<BsLinkedin className="transition-opacity duration-1000 group-hover:opacity-50" />
				<p className="w-0 overflow-hidden text-2xl transition-all duration-500 group-hover:w-32 group-hover:text-opacity-70">
					LinkedIn
				</p>
			</m.a>
		</div>
	);
}
