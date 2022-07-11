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
				mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospaces'],
				serif: ['ui-serif', 'Georgia', 'Cambria', "Times New Roman", 'Times', 'serif']
			},
			fontSize: {
				xxxs: '.25rem',
				xxs: '.5rem',
			},
			colors: {
				'green-up-tick': ' rgb(14, 203, 129)',
				'red-down-tick': 'rgb(246, 70, 93)',
			},
			flex: {
				'1/2': '0.5 0.5 0%',
				'2/3': '0.66 0.66 0%',
				'3/2': '1.33 1.33 0%',
				'5/3': '1.66 1.66 0%',
				2: '2 2 0%',
				3: '3 3 0%',
				4: '4 4 0%',
				5: '5 5 0%',
				6: '6 6 0%',
				7: '7 7 0%',
			},
			borderWidth: {
				DEFAULT: '1px',
				0: '0',
				'1/2': '0.5px',
				'3/2': '1.5px',
				1: '1px',
				2: '2px',
				3: '3px',
				4: '4px',
				6: '6px',
				8: '8px',
			},
			padding: {
				'1/2': '0.5px',
				'2/3': '0.66px',
			},
			keyframes: {
				'delayed-show': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				'delayed-show': 'delayed-show 1s ease-in-out forwards',
			},
			transitionDelay: {
				0: '0ms',
				1500: '1500ms',
				2000: '2000ms',
				2500: '2500ms',
				3000: '3000ms',
				4000: '4000ms',
				5000: '5000ms',
				10000: '10000ms',
			},
			transitionDuration: {
				0: '0ms',
				1500: '1500ms',
				2000: '2000ms',
				2500: '2500ms',
				3000: '3000ms',
				4000: '4000ms',
				5000: '5000ms',
				10000: '10000ms',
			},
			minWidth: {
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'screen-sm': '640px',
				'screen-md': '768px',
				'screen-lg': '1024px',
				'screen-xl': '1280px',
				'8xl': '1800px',
				'9xl': '2000px',
				'10xl': '2300px',
				'11xl': '2700px',
				0: '0px',
				px: '1px',
				3: '0.75rem',
				3.5: '0.875rem',
				4: '1rem',
				5: '1.25rem',
				6: '1.5rem',
				7: '1.75rem',
				8: '2rem',
				9: '2.25rem',
				10: '2.5rem',
				12: '3rem',
				14: '3.5rem',
				16: '4rem',
				20: '5rem',
				24: '6rem',
				28: '7rem',
				40: '10rem',
				52: '13rem',
				72: '18rem',
				96: '24rem',
			},
			minHeight: {
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'screen-sm': '640px',
				'screen-md': '768px',
				'screen-lg': '1024px',
				'screen-xl': '1280px',
				'8xl': '1800px',
				'9xl': '2000px',
				'10xl': '2300px',
				'11xl': '2700px',
				0: '0px',
				px: '1px',
				3: '0.75rem',
				3.5: '0.875rem',
				4: '1rem',
				5: '1.25rem',
				6: '1.5rem',
				7: '1.75rem',
				8: '2rem',
				9: '2.25rem',
				10: '2.5rem',
				12: '3rem',
				14: '3.5rem',
				16: '4rem',
				20: '5rem',
				24: '6rem',
				28: '7rem',
				32: '8rem',
				40: '10rem',
				48: '12rem',
				52: '13rem',
				56: '14rem',
				72: '18rem',
				96: '24rem',
			},
			maxHeight: {
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'screen-sm': '640px',
				'screen-md': '768px',
				'screen-lg': '1024px',
				'screen-xl': '1280px',
				'8xl': '1800px',
				'9xl': '2000px',
				'10xl': '2300px',
				'11xl': '2700px',
				0: '0px',
				px: '1px',
				3: '0.75rem',
				3.5: '0.875rem',
				4: '1rem',
				5: '1.25rem',
				6: '1.5rem',
				7: '1.75rem',
				8: '2rem',
				9: '2.25rem',
				10: '2.5rem',
				12: '3rem',
				14: '3.5rem',
				16: '4rem',
				20: '5rem',
				24: '6rem',
				28: '7rem',
				40: '10rem',
				52: '13rem',
				72: '18rem',
				96: '24rem',
			},
			maxWidth: {
				lg: '32rem',
				xl: '36rem',
				'2xl': '42rem',
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'screen-sm': '640px',
				'screen-md': '768px',
				'screen-lg': '1024px',
				'screen-xl': '1280px',
				'8xl': '1800px',
				'9xl': '2000px',
				'10xl': '2300px',
				'11xl': '2700px',
				0: '0px',
				px: '1px',
				3: '0.75rem',
				3.5: '0.875rem',
				4: '1rem',
				5: '1.25rem',
				6: '1.5rem',
				7: '1.75rem',
				8: '2rem',
				9: '2.25rem',
				10: '2.5rem',
				12: '3rem',
				14: '3.5rem',
				16: '4rem',
				20: '5rem',
				24: '6rem',
				28: '7rem',
				40: '10rem',
				52: '13rem',
				72: '18rem',
				96: '24rem',
			},
		},
	},
	variants: {
		display: [
			'children',
			'default',
			'children-first',
			'children-last',
			'children-odd',
			'children-even',
			'children-not-first',
			'children-not-last',
			'children-hover',
			'hover',
			'children-focus',
			'focus',
			'children-focus-within',
			'focus-within',
			'children-active',
			'active',
			'children-visited',
			'visited',
			'children-disabled',
			'disabled',
			'responsive',
		],
		scrollbar: ['rounded'],
	},
	plugins: [
		require('tailwind-children'),
		require('tailwind-scrollbar-variants'),
		require('tailwind-scrollbar'),
	],
};
