module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		fontFamily: {},
		container: {
			center: true,
		},
		extend: {
			boxShadow: {
				white: '0 4px 14px 0 rgba(255, 255, 255, 0.1)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')],
	daisyui: {
		themes: [
			'luxury',
			'lofi',
			'synthwave',
			'black',
			'halloween',
			'forest',
		],
	},
};
