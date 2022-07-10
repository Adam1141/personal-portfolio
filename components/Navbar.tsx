import Link from 'next/link';
import { useRouter } from 'next/router';
import { CustomLink } from '../@types/types';

const links: CustomLink[] = [
	{ title: 'Me', path: '/' },
	{ title: 'Work', path: '/work' },
	{ title: 'Contact', path: '/contact' },
];

const Navbar = () => {
	const router = useRouter();
	return (
		<div className="flex h-16 items-center justify-between text-gray-200 children:flex children:h-full children:items-center">
			<Link href="/">
				<a className="px-4 text-xl transition-all duration-500 hover:bg-gray-700 hover:bg-opacity-10 sm:px-6">
					Adam.H
				</a>
			</Link>

			<div>
				{links.map((link) => {
					return (
						<Link key={link.path} href={link.path}>
							<a
								className={`relative flex h-full w-full flex-col justify-center gap-y-2	px-4 transition-all duration-200 hover:bg-indigo-300 hover:bg-opacity-20 sm:px-6 ${
									router.pathname === link.path ? 'selected-nav-link rounded-b-md' : ''
								}`}
							>
								<span>{link.title}</span>
								<span
									className={`absolute left-0 bottom-0 h-1 w-full rounded-lg bg-indigo-700 opacity-0 transition-all duration-500 ${
										router.pathname === link.path ? 'opacity-100' : ''
									}`}
								></span>
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Navbar;
