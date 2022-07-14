import { IProject } from './@types/types';

export const GITHUB_URL = 'https://github.com/adam1141';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/adamhussein1';
export const EMAIL = 'adam.huss1141@gmail.com';

// ********** CHANGE ON DEPLOY  **********
export const WEBSITE_URL = 'http://localhost:3000';

// transition constants
export const T_PAGE_SWAP_S = 0.25;
export const T_STEP_S = 0.125;

// contact
export const MAX_NAME_LEN = 100;
export const MAX_EMAIL_LEN = 321;
export const MAX_MESSAGE_LEN = 2000;

// api
export const DEFAULT_MESSAGES_LIMIT = 100;
export const MAX_MESSAGES_LIMIT = 1000;

// other
export const YEAR_BORN = 2000;
export const MONTH_BORN = 5;
export const SESSION_VALIDITY_S = 24 * 60 * 60;

export const PROJECTS_LIST: IProject[] = [
	{
		id: 1,
		name: 'Portfolio Website',
		description:
			"This is the website you're viewing at the moment, it's a website where I talk a little bit about myself and allow other amazing people to get in touch.",

		url: 'https://github.com/Adam1141/personal-portfolio',
		imgUrl: '/portfolio-website-1.png',
		technologies: [
			'React',
			'NextJS',
			'TypeScript',
			'Tailwind',
			'JavaScript',
			'Prisma',
			'SQLite',
			'HTML',
			'CSS',
		],
	},
	{
		id: 2,
		name: 'Crypto Trading Platform',
		description:
			"The final project for the Practical Software Engineering diploma, it's a crypto trading platform where users get access to news, technical indicators as well as the ability to place orders either manually or with simple automations, the platform also has an admin panel to manage it.",
		url: 'https://crpyto-trading-platform-336908.web.app',
		imgUrl: '/crypto-trading-platform-1.png',
		technologies: [
			'React',
			'Express',
			'NodeJS',
			'TypeScript',
			'Tailwind',
			'JavaScript',
			'MongoDB',
			'HTML',
			'CSS',
		],
	},
	{
		id: 3,
		name: 'Time Tool',
		description:
			'A google chrome extension that allows users (mainly developers) to deal with and manipulate different time formats and zones with ease in the browser.',
		url: 'https://github.com/Adam1141/chrome-time-tool-extension',
		imgUrl: '/time-tool-chrome-ext-1.png',
		technologies: [
			'React',
			'TypeScript',
			'Tailwind',
			'JavaScript',
			'HTML',
			'CSS',
		],
	},
	{
		id: 4,
		name: 'Secure Diary',
		description:
			'An android app that is a secure daily journal, users can set reminders, track progress, receive daily quotes and more. Supports multiple languages.',
		url: 'https://play.google.com/store/apps/details?id=com.secureapp.securediary',
		imgUrl: '/secure-diary-1.png',
		technologies: ['Android', 'Java', 'SQLite'],
	},
	{
		id: 5,
		name: 'Rick Roulette',
		description:
			'An android roulette game where the user has a chance to get rick rolled by throwing a ball on the roulette wheel, the game is based on Rickrolling which is an internet meme (usually enjoyed by Redditors).',
		url: 'https://play.google.com/store/apps/details?id=com.theboringcreation.rickroulette',
		imgUrl: '/rick-roulette-1.png',
		technologies: ['Android', 'Java', 'SQLite'],
	},
	{
		id: 6,
		name: 'URL Shortener',
		description:
			'PHP url shortening website where a user can map a long url to a short one to make it more aesthetically pleasing or use it where there is a limit to the number of characters a message can carry, users can view info about the short url like click count.',
		url: 'https://github.com/Adam1141/url-shortener',
		imgUrl: '/url-shortener-1.png',
		technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
	},
	{
		id: 7,
		name: 'Android Strings Translator',
		description:
			'A python script to translate android strings.xml (text strings file) to other languages using the googletrans library.',
		url: 'https://github.com/Adam1141/AndroidStringsTranslator',
		imgUrl: '/android-strings-translator-1.png',
		technologies: ['Python'],
	},
];
