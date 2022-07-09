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
				<a className="px-6 transition-all duration-500 hover:bg-gray-700 hover:bg-opacity-10">
					Adam.H
				</a>
			</Link>

			<div>
				{links.map((link, idx) => {
					return (
						<Link href={link.path}>
							<a
								className={`flex h-full w-full items-center px-6 transition-all duration-200 hover:bg-indigo-300 hover:bg-opacity-20 ${
									router.pathname === link.path ? 'bg-indigo-300 bg-opacity-20' : ''
								}`}
							>
								{link.title}
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Navbar;
