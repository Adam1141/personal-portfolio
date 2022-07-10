/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Montserrat', 'sans-serif'],
		},
		extend: {
			fontFamily: {
				finlandica: ['Finlandica', 'sans-serif'],
			},
			minHeight: {
				32: '8rem',
				40: '10rem',
			},
		},
	},
	plugins: [
		require('tailwind-children'),
		require('tailwind-scrollbar-variants'),
		require('tailwind-scrollbar'),
	],
};
