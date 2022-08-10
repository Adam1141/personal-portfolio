import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { CustomLink } from '../@types/types';

const links: CustomLink[] = [
	{ title: 'Me', path: '/' },
	{ title: 'Work', path: '/work' },
	{ title: 'Contact', path: '/contact' },
];

// to measure secret entrance (not so secret i guess) clicks frequency
// array of click timestamps
let arrOfClicks: number[] = [];
const totalClicksToOpen = 5;
const inTimeMilliSeconds = 1000;

const Navbar = () => {
	const router = useRouter();
	const [openSesame, setOpenSesame] = useState(false);
	const adamRef = useRef<HTMLAnchorElement | null>(null);

	function clicksFreq() {
		arrOfClicks.push(Date.now());
		// console.log('arrOfClicks -> ', arrOfClicks);

		const arrLen = arrOfClicks.length;
		if (arrLen >= totalClicksToOpen) {
			let firstClickTs = arrOfClicks[arrLen - totalClicksToOpen];
			let lastClickTs = arrOfClicks[arrLen - 1];
			if (lastClickTs - firstClickTs <= inTimeMilliSeconds) {
				arrOfClicks = [];
				setOpenSesame(true);
			} else if (arrLen >= 100) {
				// i don't think anybody will ever reach that
				// but why not
				arrOfClicks = [];
			}
		}
	}

	useEffect(() => {
		if (openSesame) router.push('/cant-touch-dis/login');
	}, [openSesame]);

	useEffect(() => {
		const keyPressHandler = (evt) => {
			evt = evt || window.event;
			var isEscape = false;
			if ('key' in evt) {
				isEscape = evt.key === 'Escape' || evt.key === 'Esc';
			} else {
				isEscape = evt.keyCode === 27;
			}
			if (isEscape) {
				// console.log('escape');
				adamRef.current?.focus();
			}
		};

		if (adamRef.current !== null) {
			document.removeEventListener('keydown', keyPressHandler);
			document.addEventListener('keydown', keyPressHandler);
		}
	}, []);

	return (
		<div className="flex h-16 items-center justify-between text-gray-200 children:flex children:h-full children:items-center">
			<Link href="/">
				<a
					ref={adamRef}
					onClick={(e) => {
						if (openSesame) {
							// to prevent totalClicksToOpen + 1 from going to /
							e.preventDefault();
						}
						clicksFreq();
					}}
					className="px-4 text-xl transition-all duration-500 hover:bg-gray-700 hover:bg-opacity-10 sm:px-6"
				>
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
