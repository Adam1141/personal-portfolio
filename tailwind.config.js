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
		},
	},
	plugins: [require('tailwind-children')],
};
