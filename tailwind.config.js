/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			maxWidth: {
				content: '1230px'
			},
			colors: {
				night: 'var(--colors-night)',
				lightBlack: 'var(--colors-light-black)',
				primary: 'var(--colors-primary)'
			}
		}
	},
	plugins: []
};
