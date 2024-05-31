/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
	  function({ addUtilities }) {
		const newUtilities = {
		  '.display-initial': {
			display: 'initial'
		  },
		}
		addUtilities(newUtilities);
	  }
	],
	darkMode: 'class'
}
