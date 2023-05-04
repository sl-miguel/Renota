const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Sarabun', ...defaultTheme.fontFamily.sans],
		},
		colors: {
			white: '#ffffff',
			black: '#000000',
			'dark-700': '#888888',
			'dark-800': '#333333',
			'dark-900': '#111111',
			blue: '#0a72ef',
			turquoise: '#00ddd7',
			violet: '#7c28c8',
			magenta: '#eb367f',
			orange: '#fc6d26',
			yellow: '#fac92b',
		},
		extend: {},
	},
	plugins: [],
};
