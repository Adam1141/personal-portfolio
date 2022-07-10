import { T_PAGE_SWAP_S } from "./constants";

export const slideRight = {
	name: 'Slide Right',
	variants: {
		initial: { x: -300, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: {
			opacity: 0,
			x: 1000,
			transition: {
				duration: T_PAGE_SWAP_S,
			},
		},
	},
	transition: {
		duration: T_PAGE_SWAP_S,
	},
};
