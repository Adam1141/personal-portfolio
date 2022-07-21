import { BsLinkedin, BsGithub } from 'react-icons/bs';
import {
	GITHUB_URL,
	LINKEDIN_URL,
	T_PAGE_SWAP_S,
	YEARS_OLD,
} from '../constants';
import { m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import Link from 'next/link';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import Head from 'next/head';

const initialAboutMeStr = `I'm probably the most passionate developer you will ever get to work with.
If you have a great project that needs some amazing skills, I'm your guy.`;

export default function Home() {
	const [isMoreShown, setIsMoreShown] = useState(false);
	const moreDivRef = useRef<HTMLDivElement | null>(null);
	const morePRef = useRef<HTMLParagraphElement | null>(null);
	const twriterRef = useRef<Typewriter | null>(null);
	const hireMeBtnRef = useRef<HTMLButtonElement | null>(null);
	const tellMeMoreRef = useRef<HTMLParagraphElement | null>(null);
	const thisPageRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		let resizeObserver;
		if (moreDivRef?.current) {
			resizeObserver = new ResizeObserver(() => {
				const myDiv = moreDivRef.current;
				myDiv?.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
					inline: 'nearest',
				});
			});

			resizeObserver.observe(moreDivRef.current);

			// if (thisPageRef?.current) {
			// 	resizeObserver.observe(thisPageRef.current);
			// }
		}

		return () => resizeObserver?.disconnect();
	}, []);

	useEffect(() => {
		if (twriterRef.current === null) {
			twriterRef.current = new Typewriter(morePRef.current, {
				cursor: '',
				delay: 30,
				deleteSpeed: 1,
			});
		}

		if (moreDivRef.current) {
			if (
				isMoreShown &&
				morePRef.current.innerText.length === initialAboutMeStr.length
			) {
				twriterRef.current
					.deleteAll(1)
					.typeString(
						`My name is Adam Hussein I'm a ${YEARS_OLD} y.o ambitious full stack developer who currently lives in Deir Hanna, Israel.<br>`,
					)
					.pauseFor(1000)
					.changeDelay(60)
					.typeString(
						`Between the years 2020-2022 I've studied at the National School for Practical Engineering, Technion in Haifa, Israel for a Practical Software Engineering diploma,`,
					)
					.pauseFor(500)
					.typeString(` finished with a GPA of 97/100.<br>`)
					.pauseFor(1200)
					.typeString(
						`After finishing high school in 2018 and until 2020 I worked at a couple of jobs that are not related to software engineering.<br><br>`,
					)
					.pauseFor(1000)
					.typeString(
						`At the moment I'm on the job hunt to jump start my career in the software engineering realm.`,
					)
					.pauseFor(1000)
					.callFunction(() => {
						hireMeBtnRef.current?.classList?.add(
							'!border-2',
							'!h-10',
							'!w-32',
							'!block',
						);
					})
					.start();
			} else if (morePRef.current.innerText.length === 0) {
				twriterRef.current
					.changeDelay(1)
					.typeString(initialAboutMeStr)
					.callFunction(() => {
						tellMeMoreRef.current?.classList.add('!opacity-100');
					})
					.start();
			}
		}
	}, [isMoreShown]);

	return (
		<>
			<Head>
				<title>Me - Adam Hussein a Full Stack Developer</title>
				<meta
					name="description"
					content={`My name is Adam Hussein I'm a ${YEARS_OLD} y.o ambitious full stack developer who currently lives in Deir Hanna, Israel.`}
				/>
			</Head>
			<div
				ref={thisPageRef}
				id="index-page"
				className="flex-1 gap-4 overflow-y-auto p-10 sm:pl-20 sm:pt-20"
			>
				<h1 className="mb-6 flex flex-col gap-4 font-finlandica text-4xl sm:text-5xl">
					<span className="">Hi, I&apos;m Adam.</span>
					<span className="text-gray-400">A Full Stack Developer</span>
					<span className="text-gray-600">based in Israel.</span>
				</h1>

				<div
					id="about-me-container"
					ref={moreDivRef}
					className={`mb-4 min-h-72 w-full max-w-lg flex-1 pb-5 text-justify leading-7 sm:pb-10`}
				>
					<m.p
						id="type-writer-paragraph"
						ref={morePRef}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: T_PAGE_SWAP_S * 2, delay: T_PAGE_SWAP_S }}
					></m.p>
					<p
						ref={tellMeMoreRef}
						onClick={() => {
							setIsMoreShown(true);
						}}
						className={`flex cursor-pointer items-center gap-x-1 text-sm text-gray-400 opacity-0 transition-all duration-300 hover:text-opacity-70 ${
							isMoreShown ? 'hidden' : ''
						}`}
					>
						<MdOutlineDoubleArrow fill="rgb(156 163 175 / .7)" /> more
					</p>
					<Link href="/contact">
						<button
							tabIndex={-1}
							ref={hireMeBtnRef}
							className={`mt-4 h-0 w-0 overflow-hidden rounded-full border-0 border-indigo-800 px-6 py-1 font-bold transition-all duration-300 hover:rotate-1 hover:border-indigo-700 hover:bg-gray-500 hover:bg-opacity-20`}
						>
							Hire Me
						</button>
					</Link>
				</div>

				<div className="flex flex-col gap-4">
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
			</div>
		</>
	);
}
